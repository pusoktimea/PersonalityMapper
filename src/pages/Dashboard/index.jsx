import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import cookie from 'js-cookie';
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
      team: null
    };
  }

  componentWillMount() {
    const loggedInUser = cookie.get('loggedInUser');

    doGet('allTeams').then((response) => {
      this.setState({allTeams: response.data});
    });
    doGet('allUsers').then((response) => {
      this.setState({allUsers: response.data});
    });
    doGet(`userInfo/${loggedInUser}`).then((response) => {
      this.setState({team: response.data.team});
    });
  }

  managerView = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  getTeamViews() {
    const {team} = this.state;
    if (team === 'Management') {
      return {
        chartWidth: 6,
        columnCount: 3
      };
    }
    return {
      chartWidth: 9,
      columnCount: 2
    };
  }

  render() {
    const bar_data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Dummy Data',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

    const doughnut_data = {
      labels: [
        'Personality X',
        // this.state.text,
        'Personality Y',
        'Personality Z'
      ],
      datasets: [{
        data: [300, 50, 150],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#EEEEEE'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#EEEEEE'
        ]
      }]
    };

    const {
      isSideBarMinimised
    } = this.props;
    const baseClass = 'main-content';
    const getViews = this.getTeamViews();
    return (
      <div className={cx('dashboard-page', baseClass, isSideBarMinimised && `${baseClass}--stretched`)}>
        <h2 className="title">Dashboard</h2>
        <Row columnCount={getViews.columnCount}>
          {
            this.state.team === null ?
              <Loader /> :
              <Fragment>
                <Column
                  style={{
                    textAlign: 'center'
                  }}
                  width={getViews.chartWidth}
                >
                  Title
                  {
                    this.state.team === 'Management' ?
                      <Bar data={bar_data} /> :
                      <Doughnut data={doughnut_data} />
                  }
                </Column>
                <Column width={3}>
                  <Panel title="My Company">
                    {
                      this.state.allUsers.map((item, index) => (
                        <div key={index}>
                          <Icon icon="user" />
                          <span>
                            {item.name}
                          </span>
                        </div>
                      ))
                    }
                  </Panel>
                </Column>
                {
                  this.state.team === 'Management' &&
                  <Column width={3}>
                    <Panel title="Teams">
                      {
                        this.state.allTeams.map((item, index) => (
                          <div key={index}>
                            <Icon icon="users" />
                            <span>
                              {item.team}
                            </span>
                          </div>
                        ))
                      }
                    </Panel>
                  </Column>
                }
              </Fragment>
          }
        </Row>
      </div>
    );
  }
}

export default Dashboard;



