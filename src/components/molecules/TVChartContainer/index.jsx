import * as React from 'react';
import './index.css';
import { widget } from '../../../charting_library/charting_library';
import Datafeed from './api'

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// datafeedUrl: 'http://localhost:3444',
// datafeedUrl: 'https://demo_feed.tradingview.com'
export class TVChartContainer extends React.PureComponent {

	constructor(props) {
        super(props);
        this.state = {
            symbol: 'SAFEMOON/WBSC',
			interval: '15',
			height: props.height || "calc(100vh - 80px)",
			containerId: props.chartName || 'Coin-Chart',
			libraryPath: '/charting_library/',
			chartsStorageUrl: 'https://saveload.tradingview.com',
			chartsStorageApiVersion: '1.1',
			clientId: 'tradingview.com',
			userId: 'public_user_id',
			fullscreen: false,
			autosize: true,
			studiesOverrides: {},
        }
    }

	static defaultProps = {
		symbol: 'SAFEMOON/WBSC',
		interval: '15',
		containerId: 'tv_chart_container',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
	};


	tvWidget = null;

	componentDidMount() {
		const widgetOptions = {
			debug: false,
			symbol: this.state.symbol,
			datafeed: Datafeed,
			interval: this.state.interval,
			container_id: this.state.containerId,
			library_path: this.state.libraryPath,
			locale: getLanguageFromURL() || "en",
			disabled_features: ["use_localstorage_for_settings"],
			enabled_features: ["study_templates"],
			charts_storage_url: this.state.chartsStorageUrl,
			charts_storage_api_version: this.state.chartsStorageApiVersion,
			client_id: this.state.clientId,
			user_id: this.state.userId,
			fullscreen: this.state.fullscreen,
			autosize: this.state.autosize,
			studies_overrides: this.state.studiesOverrides,
			overrides: {
			  // "mainSeriesProperties.showCountdown": true,
			  "paneProperties.background": "#131722",
			  "paneProperties.vertGridProperties.color": "#363c4e",
			  "paneProperties.horzGridProperties.color": "#363c4e",
			  "symbolWatermarkProperties.transparency": 90,
			  "scalesProperties.textColor": "#AAA",
			  "mainSeriesProperties.candleStyle.wickUpColor": "#336854",
			  "mainSeriesProperties.candleStyle.wickDownColor": "#7f323f"
			}
		  };

		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget.showNoticeDialog({
					title: 'Notification',
					body: 'TradingView Charting Library API works correctly',
					callback: () => {
						console.log('Noticed!');
					},
				}));

				button.innerHTML = 'Check API';
			});
		});
	}
	/*
	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
		// removed from render temporarilly to allow size being passed through props
		{className={ 'TVChartContainer' }}
	}*/

	render() {
		return (
			<div
				id={ this.state.containerId }
				style={{
					"height": this.state.height
				}}
			/>
		);
	}
}
