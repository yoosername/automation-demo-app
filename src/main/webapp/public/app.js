var Automation = React.createClass({

  getInitialState: function() {
    return {display: true };
  },
  handleDelete() {
    var self = this;
    $.ajax({
        url: self.props.automation._links.self.href,
        type: 'DELETE',
        success: function(result) {
          self.setState({display: false});
          toastr.info(self.props.automation.name + " successfully deleted");
        },
        error: function(xhr, ajaxOptions, thrownError) {
          toastr.error(xhr.responseJSON.message);
        }
    });
  },
  render: function() {

    if (this.state.display==false) return null;
    else return (
      <tr>
          <td>{this.props.automation.name}</td>
          <td>
            <button className="btn btn-info" onClick={this.handleDelete}>Delete</button>
          </td>
      </tr>
    );
  }
});

var AutomationTable = React.createClass({

  render: function() {

    var rows = [];
    this.props.automations.forEach(function(automation) {
      rows.push(
        <Automation automation={automation} key={automation.name} />);
    });

    return (
      <table className="table table-striped">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Delete</th>
              </tr>
          </thead>
          <tbody>{rows}</tbody>
      </table>
    );
  }
});

var App = React.createClass({

  loadAutomationsFromServer: function() {

    var self = this;
    $.ajax({
        url: "http://localhost:8080/api/automations",
      }).then(function(data) {
        self.setState({ automations: data._embedded.automations });
      });

  },

  getInitialState: function() {
    return { automations: [] };
  },

  componentDidMount: function() {
    this.loadAutomationsFromServer();
  },

  render() {
    return ( <AutomationTable automations={this.state.automations} /> );
  }
});

ReactDOM.render(<App />, document.getElementById('root') );
