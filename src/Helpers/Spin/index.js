import isEqual from "lodash/isEqual";
export function apply2DSpin({
  attrName = "Rotation",
  direction = 1,
  maxWidth = 500,
}) {
  return async (player) => {
    const configurator = await window.player.getConfigurator();
    add2DSpin({ attrName, configurator, direction, maxWidth, player });
    return player;
  };
}
/****************************************************
 Handler
****************************************************/
export function add2DSpin({
  attrName = "Angle",
  configurator,
  direction = 1,
  maxWidth = 500,
  player,
}, getImg) {
  let curPct = 0;
  const attrCount = window.configurator
    .getAttributes()
    .find((attr) => attr.name === attrName).values.length;
  const threshold = 1 / attrCount;
  return window.player.tools.addTool({
    key: "2dspin",
    active: true,
    enabled: true,
    handlers: {
      drag: () => ({
        handle: async (ev) => {
          const config = configurator.getConfiguration();
          const deltaT = ev.deltaX / Math.max(ev.rect.width, maxWidth);
          const newPct = curPct + deltaT;
          if (Math.abs(newPct) > threshold) {
            const curIndex = getOptionIndex(
              configurator,
              attrName,
              config[attrName]
            );
            const increment = (newPct > 0 ? 1 : -1) * (direction < 0 ? -1 : 1);
            const newIndex = (curIndex + increment) % attrCount;
            const newOption = getOptionByIndex(
              configurator,
              attrName,
              newIndex < 0 ? attrCount + newIndex : newIndex
            );
            configurator.setConfiguration({ [attrName]: newOption })
          }
          curPct = newPct % threshold;
        },
        momentum: true,
      }),
    },
  });
}
function getOptionByIndex(configurator, attrName, index) {
  if (!configurator) return null;
  const attrs = configurator.getAttributes();
  const attribute = attrs.find((attr) => attr.name === attrName);
  return attribute.values[index];
}
function getOptionIndex(configurator, attrName, option) {
  if (!configurator) return null;
  const attrs = configurator.getAttributes();
  const attribute = attrs.find((attr) => attr.name === attrName);
  return attribute.values.findIndex((val) => isEqual(val, option));
}
