var AutomationCreateNew = React.createClass({

  render: function() {

    return (

        <div className="card">
          <div className="card-block">
            <h3 className="card-title">Create New Automation</h3>
            <p className="card-text">Go through a few steps to configure your automation</p>
            <a href="#" className="btn btn-success">Create</a>
          </div>
        </div>

    );
  }
});

var Automation = React.createClass({

  getInitialState: function() {
    return {display: true};
  },
  handleDelete() {
    var self = this;
    $.ajax({
        url: self.props.automation._links.self.href,
        type: 'DELETE',
        success: function(result) {
          self.setState({display: false});
          toastr.info("\"" + self.props.automation.name + "\"" + " successfully deleted");
        },
        error: function(xhr, ajaxOptions, thrownError) {
          toastr.error(xhr.responseJSON.message);
        }
    });
  },
  render: function() {

    if (this.state.display==false) return null;
    else return (

        <div className="card">
          <div className="card-block" className="{(self.props.active)?card-active:;}">
            <h3 className="card-title">#{this.props.automation.name}</h3>
            <p className="card-text">The actual automation description will go here eventually</p>
            <a href="#" className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
          </div>
        </div>

    );
  }
});

var AutomationList = React.createClass({

  render: function() {

        var components = [];
        this.props.automations.forEach(function(automation) {
          components.push(<Automation automation={automation} key={automation.name} />);
        });

        // Group into chunks of 4
        var groups = [];
        var children = [];
        var inc = 0;

        while(components.length > 0) {
            children.push(components.shift());
            if (children.length === 4) {
                groups.push(<div className="row" key={inc++}>{children}</div>);
                children = [];
            }
        }

        // remaining children
        if (children.length > 0 ) {
            groups.push(<div className="row" key={inc++}>{children}</div>);
        }

        return (
          <div className="container">
            {groups}
          </div>
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

  render: function() {
    return (
        <div>
        <AutomationCreateNew />
        <AutomationList automations={this.state.automations} />
        </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('root') );
