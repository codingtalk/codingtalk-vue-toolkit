import Grid from "./src/index.vue";
import GridItem from "./src/item.vue";

Grid.install = (app) => {
  app.component(Grid.name, Grid);
};

GridItem.install = (app) => {
  app.component(GridItem.name, GridItem);
};

export const CvtGridItem = GridItem;

export default Grid;
