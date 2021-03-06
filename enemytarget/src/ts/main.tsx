/// <reference path="../tsd/tsd.d.ts" />
import * as React from 'react';
import * as Reflux from 'reflux';
import * as cuAPI from 'cu-fake-api';
import events from 'cu-events';
import { EnemyTargetStore } from 'cu-stores';
import { UnitFrame } from 'cu-components';

const enemyTargetStore = EnemyTargetStore.create();

const EnemyTarget = React.createClass({

	// Hook store up to component.  Each time character data is changed,
	// our state is updated, triggering a render
	mixins: [
		Reflux.connect(enemyTargetStore, 'enemyTarget')
	],

	// Provide an initial state (TODO: is there a better way to do this?)
	getInitialState: function() {
		return { enemyTarget: enemyTargetStore.info };
	},

	componentDidMount() {
		// Start listening for character events
		events.handlesEnemyTarget.start();
	},

	// Render the unit frame using character data
	render: function() {
		var state = this.state, enemyTarget = state.enemyTarget;
		return (<UnitFrame
				name={enemyTarget.name} race={enemyTarget.race}
				health={enemyTarget.health} maxHealth={enemyTarget.maxHealth}
				stamina={enemyTarget.stamina} maxStamina={enemyTarget.maxStamina} />
			);
	}
});

events.on("init", function() {
	React.render(<EnemyTarget/>, document.getElementById("cse-ui-enemytarget"));
});
