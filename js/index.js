const original = `# This is a Markdown Preview
## You can change the input text area to preview your markdown.
A link to [freecodecamp.com](http://www.freecodecamp.com "FreeCodeCamp.Com").

You can include some code.

 \`This is some code.\` 

Or a codeblocks.

~~~~
myfunction() {
 console.log('Hello World');
}
~~~~
You can also do list of items.
1. First on the list.
2. Second of the list.

This is how you do blockquotes.
> * Quote1 
> * Quote2

You can also include images.

![freecodecamp image](https://s3.amazonaws.com/freecodecamp/camper-image-placeholder.png "freeCodeCamp image")

**Go ahead and have some fun editing your markdown input text area.**
`;

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: original };

    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(event) {
    this.setState({
      inputValue: event.target.value });

    document.getElementById('preview').innerHTML =
    marked(event.target.value);
  }
  render()
  {
    return (
      React.createElement("div", null,
      React.createElement(GetInput, { input: this.state.inputValue, handleChange: this.handleChange }),
      React.createElement(RenderInput, { input: this.state.inputValue })));


  }}
;

class GetInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      React.createElement("div", { id: "inp" },
      React.createElement("h3", null, "Markdown Input Text Area:"),
      React.createElement("textarea", { value: this.props.input,
        onChange: this.props.handleChange,
        id: "editor", rows: "15", cols: "70" })));



  }}
;

class RenderInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      React.createElement("div", { id: "out" },
      React.createElement("h3", null, "Markdown Preview:"),
      React.createElement("div", { id: "preview" })));


  }}
;

//Render the MyApp element inside the root1 element.
var app = document.getElementById("root1");
ReactDOM.render(React.createElement(MyApp, null), app);

//Overide the renderer function to add target tag to links.
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
};
//add the options to marked, also the line break <br> option.
marked.setOptions({
  renderer: renderer,
  breaks: true });


//render the original markup when page loads.
document.getElementById('preview').innerHTML = marked(original);