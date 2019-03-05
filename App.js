/**
 * Copyright (c) 2015-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator,
} from 'react-viro';

var createReactClass = require('create-react-class');

/*
 * TODO: Add your API key below!!
 */
var apiKey = "54AAE59D-B773-4281-A84D-9447A8B3279F";

// var vrScenes = {
//     '360PhotoTour': require('./js/360PhotoTour/MainScene'),
//     'HumanBody': require('./js/HumanBody/MainScene'),
//     'ProductShowcase': require('./js/ProductShowcase/ProductShowcase'),
//     'ViroMediaPlayer': require('./js/ViroMediaPlayer/ViroTheatre'),
//     'ParticleEmitters': require('./js/ParticleEmitters/ViroParticleTemplates'),
//     'PhysicsSample': require('./js/PhysicsSample/BasicPhysicsSample'),
// }

// var arScenes = {
//   'ARSimpleSample': require('./js/ARSample/HelloWorldSceneAR.js'),
//   'ARPhysicsSample': require('./js/ARPhysicsSample/BasicPhysicsSample.js'),
//   'ARCarDemo' : require('./js/ARCarDemo/ARCarDemo.js'),
//   'ARPosterDemo' : require('./js/ARPosterDemo/ARPosterDemo.js'),
//   'BusinessCard' : require('./js/ARBusinessCard/BusinessCard.js'),
// }

var showARScene = false;

var ViroCodeSamplesSceneNavigator = createReactClass({
  render: function() {
      return (
        <ViroARSceneNavigator
          initialScene={{
            scene: require('./js/ARCarDemo/ARCarDemo.js'),
          }}
          apiKey={apiKey} />
        );
  }
});

module.exports = ViroCodeSamplesSceneNavigator;
