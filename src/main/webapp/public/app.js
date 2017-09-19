'use strict';

const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;

class AutomationCreateNew extends React.Component {

  render() {

    return (

        <div className="container">
            <div className="row">
                <div className="col-3">
                    <div className="card">
                      <div className="card-block">
                        <h3 className="card-title">Create New Automation</h3>
                        <p className="card-text">Go through a few steps to configure your automation</p>
                        <Link to={'/create'} className="btn btn-success">Create</Link>
                      </div>
                    </div>
                </div>
            </div>
        </div>

    );
  }
};

class Automation extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        display: true
      };
   }

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
  }

  render() {

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

};

class AutomationList extends React.Component {

  render() {

        var components = [];
        this.props.automations.forEach(function(automation) {
          components.push(<Automation automation={automation} key={automation.name} />);
        });

        // Group into chunks of 4
        var groups = [];
        var children = [];
        var inc = 0;

        var createCol = (elem) => (
            <div className="col-3" key={elem.key}>{elem}</div>
        );

        while(components.length > 0) {
            children.push(createCol(components.shift()));
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

};

class ApplicationContainer extends React.Component {

  render() {
        return (
          <div style={{
            display: "flex"
          }}>
            {this.props.children}
          </div>
        );
   }

};

class SidebarStepper extends React.Component {

  render() {
        return (
          <div style={{
              width: "33vw",
              height: "100vh",
              overflow: "auto"
            }}>
              <div className="stepper-container vertical">
                  <div className="stepper">
                      <div className="step active">
                          <div className="step-inner">
                              <div className="step-circle"><span><i className="fa fa-fw fa-search"></i></span></div>
                          </div>
                          <div className="step-content">
                              <h3>Pick a Data Source</h3>
                              <p> Select your data source here </p>
                          </div>
                      </div>
                      <div className="step">
                          <div className="step-inner">
                              <div className="step-circle"><span><i className="fa fa-fw fa-plus-circle"></i></span></div>
                          </div>
                          <div className="step-content">
                              <h3>Add New Component</h3>
                              <p> Add a new filter or action component to apply to your data</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        );
   }

};

class Main extends React.Component {

  render() {
        return (
          <div style={{
              flex: "1",
              height: "100vh",
              overflow: "auto"
            }}>
            {this.props.children}
          </div>
        );
   }

};

class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        automations: []
      };
   }

  loadAutomationsFromServer() {

    var self = this;
    $.ajax({
        url: "http://localhost:8080/api/automations",
      }).then(function(data) {
        self.setState({ automations: data._embedded.automations });
      });

  }

  componentDidMount() {
    this.loadAutomationsFromServer();
  }

  render() {
    return (
        <Router>
            <ApplicationContainer>
                <Route exact={true} path="/" render={() => (
                    <Main>
                        <AutomationCreateNew />
                        <AutomationList automations={this.state.automations} />
                    </Main>
                )}/>
                <Route path="/create" render={() => (
                    <div style={{display: "flex"}}>
                        <SidebarStepper />
                        <Main>
                            <div style={{padding:"3rem"}}>Some form will go here</div>
                        </Main>
                    </div>
                )}/>
            </ApplicationContainer>
        </Router>
    );
  }

};

ReactDOM.render(<App />, document.getElementById('root') );