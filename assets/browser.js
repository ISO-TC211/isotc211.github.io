(function () {

  function getSchemaPath({ standardNumber, partNumber, nsPrefix, version }) {
    return `${standardNumber}/-${partNumber}/${nsPrefix}/${version}`;
  }

  function getOntologyPath({ base, standardNumber, partNumber, year, version }) {
    return `${standardNumber}-${partNumber}/${year}/${version}`;
  }

  class ResourceLocator {
    constructor() {
      this.form = null;
    }
    getInputValue(inputName) {
      return this.form.querySelector(`input[name=${inputName}]`).value;
    }
  }

  class SchemaLocator extends ResourceLocator {
    constructor() {
      super();
      this.handleLocateClick = this.handleLocateClick.bind(this);
      this.handleLocateIsoClick = this.handleLocateIsoClick.bind(this);
    }
    render() {
      const template = document.querySelector('#schemaLocator');
      let el = document.importNode(template.content, true);

      this.form = el;
      this.form.querySelector('button[name=locate]').
        addEventListener('click', this.handleLocateClick);
      this.form.querySelector('button[name=locateIso]').
        addEventListener('click', this.handleLocateIsoClick);

      return el;
    }
    getInputValue(inputName) {
      return this.form.querySelector(`input[name=${inputName}]`).value;
    }
    getFormValues() {
      return {
        standardNumber: this.getInputValue('standardNumber'),
        partNumber: this.getInputValue('partNumber'),
        nsPrefix: this.getInputValue('nsPrefix'),
        version: this.getInputValue('version'),
      };
    }
    handleLocateClick() {
      window.location.href = `https://schemas.isotc211.org/${getSchemaPath(this.getFormValues())}`;
    }
    handleLocateIsoClick() {
      window.location.href = `https://standards.iso.org/${getSchemaPath(this.getFormValues())}`;
    }
  }

  class OntologyLocator extends ResourceLocator {
    constructor() {
      super();
      this.handleLocateClick = this.handleLocateClick.bind(this);
    }
    render() {
      const template = document.querySelector('#ontologyLocator');
      let el = document.importNode(template.content, true);

      this.form = el;
      this.form.querySelector('button[name=locate]').
        addEventListener('click', this.handleLocateClick);

      return el;
    }
    getFormValues() {
      return {
        standardNumber: this.getInputValue('standardNumber'),
        partNumber: this.getInputValue('partNumber'),
        year: this.getInputValue('year'),
        version: this.getInputValue('version'),
      };
    }
    handleLocateClick() {
      window.location.href = `https://def.isotc211.org/${getOntologyPath(this.getFormValues())}`;
    }
  }

  document.querySelector('.section.ontologies > h2').nextSibling.insertBefore((new OntologyLocator).render());

}());
