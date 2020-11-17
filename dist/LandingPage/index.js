import React from "react";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Markdown from "react-markdown";
import GitHubButton from "react-github-btn";
import "./github-markdown.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/languages/hljs/javascript";
var contentMd = "# Features\n\n- Simple input/output format\n- Bounding Box, Point and Polygon Annotation\n- Zooming, Scaling, Panning\n- Multiple Images\n- Cursor Crosshair\n\n![Screenshot of Annotator](https://user-images.githubusercontent.com/1910070/51199716-83c72080-18c5-11e9-837c-c3a89c8caef4.png)\n\n# Usage\n\n## Installation\n\n```bash\nnpm install react-image-annotate\n```\n\n## Basic Example\n\n```javascript\nimport ReactImageAnnotate from \"react-image-annotate\"\n\nconst App = () => (\n  <ReactImageAnnotate\n    selectedImage=\"https://example.com/image1.png\"\n    taskDescription=\"# Draw region around each animal.\"\n    images={[{ src: \"https://example.com/image1.png\", name: \"Image 1\" }]}\n    regionClsList={[\"Dog\", \"Cat\"]}\n    enabledTools={[\"create-box\"]}\n  />\n)\n```\n\n# Props\n\nAll of the following properties can be defined on the `ReactImageAnnotate` component...\n\n| Prop                     | Type (\\* = required)                             | Description                                                                             | Default       |\n| ------------------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------- |\n| `taskDescription`        | \\*`string`                                       | Markdown description for what to do in the image.                                       |               |\n| `allowedArea`            | `{ x: number, y: number, w: number, h: number }` | Area that is available for annotation.                                                  | Entire image. |\n| `regionTagList`          | `Array<string>`                                  | Allowed \"tags\" (mutually inclusive classifications) for regions.                        |               |\n| `regionClsList`          | `Array<string>`                                  | Allowed \"classes\" (mutually exclusive classifications) for regions.                     |               |\n| `imageTagList`           | `Array<string>`                                  | Allowed tags for entire image.                                                          |               |\n| `imageClsList`           | `Array<string>`                                  | Allowed classes for entire image.                                                       |               |\n| `enabledTools`           | `Array<string>`                                  | Tools allowed to be used. e.g. \"select\", \"create-point\", \"create-box\", \"create-polygon\" | Everything.   |\n| `showTags`               | `boolean`                                        | Show tags and allow tags on regions.                                                    | `true`        |\n| `selectedImage`          | `string`                                         | URL of initially selected image.                                                        |               |\n| `images`                 | `Array<Image>`                                   | Array of images to load into annotator                                                  |               |\n| `showPointDistances`     | `boolean`                                        | Show distances between points.                                                          | `false`       |\n| `pointDistancePrecision` | `number`                                         | Precision on displayed points (e.g. 3 => 0.123)                                         |               |\n| `onExit`                 | `MainLayoutState => any`                         | Called when \"Save\" is called.                                                           |               |\n\n# Sponsors\n\n[![wao.ai sponsorship image](https://s3.amazonaws.com/asset.workaround.online/sponsorship-banner-1.png)](https://wao.ai)\n";
var RootContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
});
var ContentContainer = styled("div")({
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  maxWidth: 1200
});
var Header = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  backgroundColor: colors.blue[600],
  padding: 8,
  boxSizing: "border-box"
});
var HeaderButton = styled(Button)({
  color: "white",
  margin: 8,
  padding: 16,
  paddingLeft: 24,
  paddingRight: 24
});
var Hero = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  backgroundColor: colors.blue[500],
  padding: 16,
  color: "white",
  boxSizing: "border-box"
});
var HeroMain = styled("div")({
  fontSize: 48,
  fontWeight: "bold",
  paddingTop: 64,
  textShadow: "0px 1px 5px rgba(0,0,0,0.3)"
});
var HeroSub = styled("div")({
  paddingTop: 32,
  lineHeight: 1.5,
  fontSize: 24,
  textShadow: "0px 1px 3px rgba(0,0,0,0.2)"
});
var HeroButtons = styled("div")({
  paddingTop: 32,
  paddingBottom: 48
});
var Section = styled("div")({
  display: "flex",
  padding: 16,
  paddingTop: 32,
  flexDirection: "column"
});

var CodeBlock = function CodeBlock(_ref) {
  var language = _ref.language,
      value = _ref.value;
  return /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    language: language,
    style: docco
  }, value);
};

function flatten(text, child) {
  return typeof child === "string" ? text + child : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props) {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flatten, "");
  var slug = text.toLowerCase().replace(/\W/g, "-");
  return React.createElement("h" + props.level, {
    id: slug
  }, props.children);
}

var LandingPage = function LandingPage() {
  return /*#__PURE__*/React.createElement(RootContainer, null, /*#__PURE__*/React.createElement(Header, {
    id: "about"
  }, /*#__PURE__*/React.createElement(ContentContainer, {
    style: {
      flexDirection: "row",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement(HeaderButton, {
    href: "#features"
  }, "Features"), /*#__PURE__*/React.createElement(HeaderButton, {
    href: "#usage"
  }, "Usage"), /*#__PURE__*/React.createElement(HeaderButton, {
    href: "#props"
  }, "Props"), /*#__PURE__*/React.createElement(HeaderButton, {
    href: "./demo"
  }, "Demo Playground"))), /*#__PURE__*/React.createElement(Hero, null, /*#__PURE__*/React.createElement(ContentContainer, null, /*#__PURE__*/React.createElement(HeroMain, null, "React Image Annotate"), /*#__PURE__*/React.createElement(HeroSub, null, "Powerful React component for image annotations with bounding boxes, tagging, classification, multiple images and polygon segmentation."), /*#__PURE__*/React.createElement(HeroButtons, null, /*#__PURE__*/React.createElement(GitHubButton, {
    href: "https://github.com/waoai/react-image-annotate",
    "data-size": "large",
    "data-show-count": "true",
    "aria-label": "Star waoai/react-image-annotate on GitHub"
  }, "Star")))), /*#__PURE__*/React.createElement(ContentContainer, {
    className: "markdown-body"
  }, /*#__PURE__*/React.createElement(Section, {
    className: "markdown-body"
  }, /*#__PURE__*/React.createElement(Markdown, {
    escapeHtml: false,
    source: contentMd,
    renderers: {
      code: CodeBlock,
      heading: HeadingRenderer
    }
  }))));
};

export default LandingPage;