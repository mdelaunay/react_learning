var FilterableProductTable = React.createClass({

  getInitialState: function(){
    return ({
      filterText: '',
      inStockOnly: false
    });
  },

  handleChange: function(filters){
    this.setState(filters);
  },

  render: function() {
    return (
      <div>
        <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} handleChange={this.handleChange} />
        <ProductTable products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
      </div>
    );
  }
});

var ProductCategoryRow = React.createClass({
  render: function(){
    return (
      <tr>
        <th colspan="2">
          {this.props.category}
        </th>
      </tr>
    );
  }
});

var ProductRow = React.createClass({
  render: function(){

    var name = this.props.product.stocked ? this.props.product.name : <span className="red">{this.props.product.name}</span>

    return (
      <tr>
        <td>
          {name}
        </td>
        <td>
          {this.props.product.price}
        </td>
      </tr>
    );
  }
});


var ProductTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }

      if (product.category != lastCategory) {
        rows.push(<ProductCategoryRow key={product.category} category={product.category} />);
      } 
      rows.push(<ProductRow key={product.name} product={product} />)
      lastCategory = product.category;
    }.bind(this));

    return (
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});



var SearchBar = React.createClass({

  handleChange: function(){
    this.props.handleChange({filterText: this.refs.inputFilterText.value, inStockOnly: this.refs.inputStockOnly.checked});
  },

  render: function(){

    return (
      <form>
        <div>
          <input ref="inputFilterText" type="text" placeholder="Search..." value={this.props.filterText} onChange={this.handleChange}/>
        </div>
        <div>
          <input ref="inputStockOnly" type="checkbox" checked={this.props.inStockOnly} onChange={this.handleChange}/> Only on stock
        </div>
      </form>
    );
  }
});


