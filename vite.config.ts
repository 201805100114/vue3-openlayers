import vue from "@vitejs/plugin-vue";
/// <reference types="vite/client" />
/// <reference types="vitest" />
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      // logLevel: 'warn',
      // copyDtsFiles: false,
      outDir: ["dist"],
      // include: ['src/index.ts'],
      exclude: ["src/main.ts"],
      aliasesExclude: [/^@demos/],
      staticImport: true,
      // rollupTypes: true,
      insertTypesEntry: true,
    }),
    vue(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url),
      ),
      "@demos": fileURLToPath(new URL("./src/demos", import.meta.url)),
    },
    preserveSymlinks: false,
    dedupe: ["vue"],
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      name: "vue3-openlayers",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `vue3-openlayers.${format}.js`,
    },
    minify: false,
    rollupOptions: {
      // make sure to externalize deps that should not be bundled
      // into your library
      input: {
        main: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      },
      external: ["vue", /^ol.*/], // Avoid bundling ol imports into the final build
      output: {
        inlineDynamicImports: true,
        exports: "named",
        globals: {
          vue: "Vue",
          "ol/Feature": "Feature",
          "ol/geom": "geom",
          "ol/format": "format",
          "ol/loadingstrategy": "loadingstrategy",
          "ol/events/condition": "selectconditions",
          "ol/extent": "extent",
          "ol/easing": "animations",
          "ol/Geolocation": "Geolocation",
          "ol/Map": "Map$1",
          "ol/interaction/defaults": "defaults",
          "ol/Overlay": "Overlay",
          "ol/proj/proj4": "proj4$1",
          "ol/proj/Projection": "Projection$1",
          "ol/View": "View",
          "ol/source": "source",
          "ol-ext/layer/AnimatedCluster": "AnimatedCluster",
          "ol/layer/Heatmap": "HeatmapLayer",
          "ol/layer/Image": "ImageLayer",
          "ol/layer/Group": "LayerGroup",
          "ol/layer/Tile": "TileLayer",
          "ol/layer/Vector": "VectorLayer",
          "ol/layer/VectorTile": "VectorLayerTile",
          "ol/layer/VectorImage": "VectorImageLayer",
          "ol/layer/WebGLPoints": "WebGLPointsLayer",
          "ol/layer/WebGLTile": "TileLayer$1",
          "ol/source/BingMaps": "BingMaps",
          "ol/source/Cluster": "Cluster",
          "ol/source/ImageStatic": "Static",
          "ol/proj": "proj",
          "ol/source/ImageWMS": "ImageWMS",
          "ol/source/GeoTIFF": "GeoTIFF",
          "ol/source/OSM": "OSM",
          "ol/source/StadiaMaps": "StadiaMaps",
          "ol/source/TileDebug": "TileDebug",
          "ol/source/WMTS": "WMTSSource",
          "ol/tilegrid/WMTS": "TileGridWMTS",
          "ol/source/TileArcGISRest": "TileArcGISRest",
          "ol/tilegrid": "tilegrid",
          "ol/source/TileJSON": "TileJSON",
          "ol/source/TileWMS": "TileWMS",
          "ol/source/Vector": "VectorSource",
          "ol/source/VectorTile": "VectorSourceTile",
          "ol/source/XYZ": "XYZ",
          "ol/control": "control",
          "ol/control/OverviewMap": "OverviewMap",
          "ol-ext/control/Button": "Button",
          "ol-contextmenu": "ContextMenu",
          "ol-ext/control/Bar": "Bar",
          "ol-ext/control/LayerSwitcher": "LayerSwitcher",
          "ol-ext/control/LayerSwitcherImage": "LayerSwitcherImage",
          "ol-ext/control/PrintDialog": "PrintDialog",
          "ol/control/Rotate": "Rotate$1",
          "ol-ext/control/Swipe": "Swipe",
          "ol-ext/control/Toggle": "Toggle",
          "ol-ext/control/VideoRecorder": "VideoRecorder",
          "ol-ext/control/MapZone": "MapZone",
          "ol/control/Zoom": "Zoom",
          "ol/control/ZoomSlider": "ZoomSlider",
          "ol/control/ZoomToExtent": "ZoomToExtent",
          "ol/geom/Circle": "Circle",
          "ol/geom/LineString": "LineString",
          "ol/geom/MultiLineString": "MultiLineString",
          "ol/geom/MultiPoint": "MultiPoint",
          "ol/geom/MultiPolygon": "MultiPolygon",
          "ol/geom/Point": "Point$2",
          "ol/geom/Polygon": "Polygon",
          "ol/style/Style": "Style",
          "ol/interaction/Draw": "Draw",
          "ol/interaction/Modify": "Modify",
          "ol/style/Circle": "CircleStyle",
          "ol/style/Fill": "Fill",
          "ol/style/Stroke": "Stroke",
          "ol/style/Icon": "Icon",
          "ol/style/Text": "Text",
          "ol-ext/style/FlowLine": "FlowLine",
          "ol-ext/interaction/SelectCluster": "SelectCluster",
          "ol/interaction/DragRotate": "DragRotate",
          "ol/interaction/DragRotateAndZoom": "DragRotateAndZoom",
          "ol/interaction/Select": "Select",
          "ol/interaction/Snap": "Snap",
          "ol-ext/interaction/Transform": "Transform$1",
          "ol-ext/featureanimation/Drop": "Drop",
          "ol-ext/featureanimation/Fade": "Fade",
          "ol-ext/featureanimation/Path": "Path",
          "ol-ext/featureanimation/Shake": "Shake",
          "ol-ext/featureanimation/Slide": "Slide",
          "ol-ext/featureanimation/Teleport": "Teleport",
          "ol-ext/featureanimation/Zoom": "Zoom$1",
        },
        assetFileNames: (assetInfo) => {
          return assetInfo.name === "index.css"
            ? "styles.css"
            : assetInfo.name || "";
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
