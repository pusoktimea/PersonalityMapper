import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import cookie from 'js-cookie';
import {Link} from 'react-router-dom';

import {doGet} from '../../utils/APIUtils';

import {Doughnut, Bar} from 'react-chartjs-2';

import Row from 'components/Grid/Row';
import Column from 'components/Grid/Column';
import Panel from 'components/Panel';
import Icon from 'components/Icon';
import Loader from 'components/Loader';

import './dashboard-page.scss';

class Dashboard extends PureComponent {
  static propTypes = {
    isTablesLoaded: PropTypes.bool,
    onGetTables: PropTypes.func,
    tables: PropTypes.object,
    isSideBarMinimised: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      allTeams: [],
      allUsers: [],
      allPerstype: {},
      persInTeam: [],
      persTypeInTeam: [],
      teamMemberNames: [],
      team: null
    };
  }

  componentWillMount() {
    const loggedInUser = cookie.get('loggedInUser');
    doGet(`userInfo/${loggedInUser}`).then((response) => {
      this.setState({team: response.data.team});
      doGet(`perstype/${response.data.team}`).then((response) => {
        this.setState({persInTeam: response.data});
        const teamMemberNames = response.data.map(item => (item.profile.name));
        this.setState({teamMemberNames: teamMemberNames});
        const persTypeInTeam = response.data.map(item => (item.profile.persType));
        const teamPersTypeCounter = persTypeInTeam.reduce((persTypeCount, currentPerstype) =>  {
          if(typeof persTypeCount[currentPerstype] !== 'undefined'){
            persTypeCount[currentPerstype]++;
            return persTypeCount;
          } else {
            persTypeCount[currentPerstype] = 1;
            return persTypeCount;
          }
        }, {});
        this.setState({persTypeInTeam: teamPersTypeCounter});
      });
    });
    doGet('allTeams').then((response) => {
      const teamCounter = response.data.reduce((teamCount, currentTeam) =>  {
        if(typeof teamCount[currentTeam.team] !== 'undefined'){
          teamCount[currentTeam.team]++;
          return teamCount;
        } else {
          teamCount[currentTeam.team] = 1;
          return teamCount;
        }
      }, {});
      this.setState({allTeams: teamCounter});
    });
    doGet('allUsers').then((response) => {
      this.setState({allUsers: response.data});
    });
    doGet('allPerstype').then((response) => {
      const allPersType = response.data.map(item => (item.profile.persType));
      const persTypeCounter = allPersType.reduce((persTypeCount, currentPerstype) =>  {
        if(typeof persTypeCount[currentPerstype] !== 'undefined'){
          persTypeCount[currentPerstype]++;
          return persTypeCount;
        } else {
          persTypeCount[currentPerstype] = 1;
          return persTypeCount;
        }
      }, {});
      this.setState({allPerstype: persTypeCounter});
    });
  }

  managerView = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  barChart() {
    const persTypes = Object.keys(this.state.allPerstype);
    const persTypeNumbers = Object.values(this.state.allPerstype);
    persTypeNumbers.push(0);
    return {
      labels: persTypes,
      datasets: [
        {
          label: 'MBTI Personality Type - Test Results',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: persTypeNumbers
        }
      ]
    };
  }

  doughnutData(team) {
    const persTypes = Object.keys(this.state.persTypeInTeam);
    const persTypeSum = Object.values(this.state.persTypeInTeam);
    return {
      labels: persTypes,
      datasets: [{
        data: persTypeSum,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#9bc898',
          '#ffe766'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#9bc898',
          '#ffe766'
        ]
      }]
    };
  }

  render() {
    const {
      isSideBarMinimised
    } = this.props;
    const baseClass = 'main-content';
    return (
      <div className={cx('dashboard-page', baseClass, isSideBarMinimised && `${baseClass}--stretched`)}>
        <h2 className="title">Dashboard</h2>
        <Row columnCount={3}>
          {
            this.state.team === null ?
              <Loader /> :
              <Fragment>
                <Column
                  style={{
                    textAlign: 'center'
                  }}
                  width={6}
                >
                  {
                    this.state.team === 'Management' ?
                      <div>
                        <h2>
                          Personality types in your company
                        </h2>
                        <Bar data={this.barChart()} />
                      </div> :
                      <div>
                        <h2>
                          Personality types in team {this.state.team}
                        </h2>
                        <Doughnut data={this.doughnutData(this.state.team)} />
                      </div>
                  }
                </Column>
                {
                  this.state.team === 'Management' ?
                    <Column width={3}>
                      <Panel title="Teams">
                        {
                          Object.keys(this.state.allTeams).map((item, index) => (
                            <div key={index}>
                              <Icon icon="users" />
                              <span>
                                {item}
                              </span>
                            </div>
                          ))
                        }
                      </Panel>
                    </Column> :
                    <Column width={3}>
                      <Panel title="My Team">
                        {
                          this.state.persInTeam.map((item, index) => (
                            <div key={index}>
                              <Icon icon="user" />
                              <Link to={`/profile/${item.username}`}>
                                {item.profile.name} - {item.profile.persType}
                              </Link>
                            </div>
                          ))
                        }
                      </Panel>
                    </Column>
                }
                <Column width={3}>
                  <Panel title="My Company">
                    {
                      this.state.allUsers.map((item, index) => (
                        <div key={index}>
                          <Icon icon="user" />
                          <Link to={`/profile/${item.username}`}>
                            {item.profile.name}
                          </Link>
                        </div>
                      ))
                    }
                  </Panel>
                </Column>
              </Fragment>
          }
        </Row>
      </div>
    );
  }
}

export default Dashboard;
