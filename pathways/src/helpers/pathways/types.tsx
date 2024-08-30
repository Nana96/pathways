export interface StickyProps {
  data: GeoJSON.FeatureCollection;
  distances: number[];
  dimensions: {
    width: number;
    height: number;
    margin: { top: number; right: number; bottom: number; left: number };
  };
  index: number;
  updateIndex: (newIndex: number) => void;
}
