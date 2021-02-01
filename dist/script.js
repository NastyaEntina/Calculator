let operRegex = /[*/+-]+/;

let buildTree = str => {
  if (/^-?[0-9.]+$/.test(str)) return str;
  let match = str.match(/\d[-+]/g);
  if (!match) match = str.match(/\d[*/]/g);
  let ind = str.lastIndexOf(match.pop()) + 1;
  return {
    do: str[ind],
    a: buildTree(str.slice(0, ind)),
    b: buildTree(str.slice(ind + 1)) };

};

let calc = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y };


let calcTree = tree => {
  if (typeof tree == 'string') return tree;
  let res = calc[tree.do](Number(calcTree(tree.a)), Number(calcTree(tree.b)));
  return res;
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: '',
      current: '' };

    this.clear = this.clear.bind(this);
    this.setDot = this.setDot.bind(this);
    this.setMinus = this.setMinus.bind(this);
    this.calculate = this.calculate.bind(this);
    //this.addToCurrent = this.addToCurrent.bind(this)
  }
  addToCurrent(value) {
    this.setState(prevState => ({
      current: prevState.current + value }));

  }

  clear() {
    this.setState({
      formula: '',
      current: '',
      lastFormula: '' });

  }
  setDigit(value) {
    if (this.state.lastFormula && this.state.formula == '') {
      this.setState({
        lastFormula: '',
        current: value.toString() });

    } else {
      if (!(this.state.current == 0 && value == 0)) {
        if (operRegex.test(this.state.current)) {
          this.setState(prevState => ({
            formula: prevState.formula + prevState.current,
            current: value.toString() }));

        } else {this.addToCurrent(value);}
      }
    }
  }
  setDot() {
    if (this.state.lastFormula && this.state.formula == '') {
      this.setState({
        lastFormula: '',
        current: '0.' });

    } else {
      if (!this.state.current.includes('.')) {
        if (operRegex.test(this.state.current) || this.state.current == '') {
          this.setState(prevState => ({
            formula: prevState.formula + prevState.current,
            current: '0.' }));

        } else {this.addToCurrent('.');}
      }
    }
  }
  setOperation(value) {
    if (this.state.current != '') {
      if (!operRegex.test(this.state.current)) {
        this.setState(prevState => ({
          formula: prevState.formula + prevState.current,
          current: value }));

      } else {
        this.setState({
          current: value });

      }
    }
  }
  setMinus() {
    if (operRegex.test(this.state.current)) {
      if (this.state.current.length == 1) this.addToCurrent('-');
    } else {
      this.setState(prevState => ({
        formula: prevState.formula + prevState.current,
        current: '-' }));

    }
  }

  calculate() {
    let curForm = this.state.formula;
    if (!operRegex.test(this.state.current)) curForm += this.state.current;
    debugger;
    let tree = buildTree(curForm);
    let result = calcTree(tree);
    this.setState({
      formula: '',
      lastFormula: curForm + '=',
      current: result });

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "calculator", class: "container" }, /*#__PURE__*/
      React.createElement("div", { id: "show" }, /*#__PURE__*/
      React.createElement("div", { id: "formula" }, this.state.formula || this.state.lastFormula, this.state.current), /*#__PURE__*/
      React.createElement("div", { id: "display" }, this.state.current || 0)), /*#__PURE__*/

      React.createElement("button", { id: "clear", onClick: this.clear }, "AC"), /*#__PURE__*/
      React.createElement("button", { id: "divide", onClick: e => this.setOperation('/') }, "/"), /*#__PURE__*/
      React.createElement("button", { id: "multiply", onClick: e => this.setOperation('*') }, "X"), /*#__PURE__*/
      React.createElement("button", { id: "seven", onClick: e => this.setDigit(7) }, "7"), /*#__PURE__*/
      React.createElement("button", { id: "eight", onClick: e => this.setDigit(8) }, "8"), /*#__PURE__*/
      React.createElement("button", { id: "nine", onClick: e => this.setDigit(9) }, "9"), /*#__PURE__*/
      React.createElement("button", { id: "subtract", onClick: this.setMinus }, "-"), /*#__PURE__*/
      React.createElement("button", { id: "four", onClick: e => this.setDigit(4) }, "4"), /*#__PURE__*/
      React.createElement("button", { id: "five", onClick: e => this.setDigit(5) }, "5"), /*#__PURE__*/
      React.createElement("button", { id: "six", onClick: e => this.setDigit(6) }, "6"), /*#__PURE__*/
      React.createElement("button", { id: "add", onClick: e => this.setOperation('+') }, "+"), /*#__PURE__*/
      React.createElement("button", { id: "one", onClick: e => this.setDigit(1) }, "1"), /*#__PURE__*/
      React.createElement("button", { id: "two", onClick: e => this.setDigit(2) }, "2"), /*#__PURE__*/
      React.createElement("button", { id: "three", onClick: e => this.setDigit(3) }, "3"), /*#__PURE__*/
      React.createElement("button", { id: "zero", onClick: e => this.setDigit(0) }, "0"), /*#__PURE__*/
      React.createElement("button", { id: "decimal", onClick: this.setDot }, "."), /*#__PURE__*/
      React.createElement("button", { id: "equals", onClick: this.calculate }, "=")));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Calculator, null), document.getElementById('main'));