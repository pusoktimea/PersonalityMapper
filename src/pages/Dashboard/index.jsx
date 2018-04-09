import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {doGet} from '../../utils/APIUtils';

import {Doughnut, Bar} from 'react-chartjs-2';

import Row from 'components/Grid/Row';
import Column from 'components/Grid/Column';

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
    this.state = {};
  }

  componentWillMount() {
    return doGet('notes/5aaed2963a1c9b858fd5b404').then((response) => {
      this.setState({text: response.data.text});
    });

  }

  render() {
    const doughnut_data = {
      labels: [
        // 'Personality X',
        this.state.text,
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

    const {
      isSideBarMinimised
    } = this.props;
    const baseClass = 'main-content';

    return (
      <div className={cx('profile-page', baseClass, isSideBarMinimised && `${baseClass}--stretched`)}>
        <h2 className="title">Dashboard</h2>
        <Row columnCount={2}>
          <Column
            style={{
              textAlign: 'center'
            }}
            width={6}
          >
            1
            <Doughnut data={doughnut_data} />
          </Column>
          <Column
            style={{
              textAlign: 'center'
            }}
            width={6}
          >
            2
            <Bar data={bar_data} />
          </Column>
        </Row>
      </div>
    );
  }
}

export default Dashboard;



