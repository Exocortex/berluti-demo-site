import isEqual from "lodash/isEqual";
/****************************************************
 Player Initialization
****************************************************/
window
  .threekitPlayer({
    ...initParams,
  })
  .then(apply2DSpin("Angle"));
/****************************************************
 Composer
****************************************************/
function apply2DSpin(attrName = "Angle") {
  return async (player) => {
    const configurator = await player.getConfigurator();
    add2DSpin({ player, configurator, attrName });
    return player;
  };
}
/****************************************************
 Handler
****************************************************/
function add2DSpin({ player, configurator, attrName = "Angle" }) {
  let curPct = 0;
  const attrCount = configurator
    .getAttributes()
    .find((attr) => attr.name === attrName).values.length;
  const threshold = 1 / attrCount;
  return player.tools.addTool({
    key: "2dspin",
    active: true,
    enabled: true,
    handlers: {
      drag: () => ({
        handle: async (ev) => {
          const config = configurator.getConfiguration();
          const deltaT = ev.deltaX / ev.rect.width;
          const newPct = curPct + deltaT;
          if (Math.abs(newPct) > threshold) {
            const curIndex = getOptionIndex(
              configurator,
              attrName,
              config[attrName]
            );
            const increment = newPct > 0 ? 1 : -1;
            const newIndex = (curIndex + increment) % attrCount;
            const newOption = getOptionByIndex(
              configurator,
              attrName,
              newIndex < 0 ? attrCount + newIndex : newIndex
            );
            configurator.setConfiguration({ [attrName]: newOption });
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