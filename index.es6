import React from 'react';
import Link from './link.es6';

let editor = {};
export default class Playground extends React.Component {

  static get propTypes() {
    return {
      children: React.PropTypes.element.isRequired,
    };
  }

  componentWillMount() {
    this.setState({ data: {} });
  }

  componentDidMount() {
    /* eslint-disable id-match */
    /* eslint-disable no-undef */
    /* eslint-disable no-console */
    const properties = {};
    for (const prop in Link.propTypes) {
      let type = '';
      if (Link.propTypes[prop] === React.PropTypes.string.isRequired) {
        type = 'string';
      }
      properties[prop] = {
        type,
      };
    }
    const schemaObj = {
      schema: {
        type: 'object',
        title: 'Link',
        properties,
      },
    };
    editor = new JSONEditor(document.getElementById('json-editor'), schemaObj);
    this.editorVal = editor.getValue();
    const elms = document.querySelectorAll('.form-control input');
    for (let i = 0; i < elms.length; i++) {
      elms[i].onkeyup = this.update.bind(this);
    }
  }

  update(evt) {
    const reg = /root\[(.*)]/;
    this.editorVal[reg.exec(evt.target.name)[1]] = evt.target.value;
    this.setState({ data: this.editorVal });
  }

  render() {
    const child = React.cloneElement(
      this.props.children,
      ...this.state.data
    );
    return (
      <div>
        {child}
        <form id="json-editor"></form>
      </div>
    );
  }
}
