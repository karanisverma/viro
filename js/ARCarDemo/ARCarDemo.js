"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroARScene,
  ViroMaterials,
  ViroNode,
  ViroAnimations,
  Viro3DObject,
  ViroLightingEnvironment,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroSphere,
  ViroSpotLight,
  ViroQuad,
  ViroBox,
  ViroARPlaneSelector,
  ViroPolygon
} from "react-viro";

var createReactClass = require("create-react-class");

var ARCarDemo = createReactClass({
  getInitialState() {
    return {
      texture: "white",
      playAnim: false,
      animateCar: false,
      tapWhite: false,
      tapBlue: false,
      tapGrey: false,
      tapRed: false,
      tapYellow: false,
      rotation : [0, 0, 0],
      position: [0, 0, 0],
      carAnimName:['moveOutCar', 'moveInCar'],
      carPlayAnim: [false,true]
    };
  },

  render: function() {
    return (
      <ViroARScene>
        <ViroLightingEnvironment
          source={require("./res/tesla/garage_1k.hdr")}
        />
        <ViroARPlaneSelector
          minHeight={0.03}
          minWidth={0.03}
          onPlaneSelected={this._onAnchorFound}
        >
        <ViroNode>
          <ViroPolygon
              position={[-0.25, 0.1, 0]}
              vertices={[[-0.08,0], [0,0.08], [0,-0.08]]}
              materials={"blue_plane"}
              onClick={this._pervCar}
              />
          <ViroPolygon
              position={[0.25, 0.1, 0]}
              vertices={[[0.08,0], [0,0.08], [0,-0.08]]}
              materials={"blue_plane"}
              onClick={this._nextCar}
              />
        </ViroNode>

          <ViroNode
            scale={[0, 0, 0]}
            transformBehaviors={["billboardY"]}
            animation={{ name: this.state.animName, run: this.state.playAnim }}
          >
            <ViroSphere
              materials={["white_sphere"]}
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.03}
              position={[-0.2, 0.25, 0]}
              onClick={this._selectWhite}
              animation={{
                name: "tapAnimation",
                run: this.state.tapWhite,
                onFinish: this._animateFinished
              }}
              shadowCastingBitMask={0}
            />

            <ViroSphere
              materials={["blue_sphere"]}
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.03}
              position={[-0.1, 0.25, 0]}
              onClick={this._selectBlue}
              animation={{
                name: "tapAnimation",
                run: this.state.tapBlue,
                onFinish: this._animateFinished
              }}
              shadowCastingBitMask={0}
            />

            <ViroSphere
              materials={["grey_sphere"]}
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.03}
              position={[0, 0.25, 0]}
              onClick={this._selectGrey}
              animation={{
                name: "tapAnimation",
                run: this.state.tapGrey,
                onFinish: this._animateFinished
              }}
              shadowCastingBitMask={0}
            />

            <ViroSphere
              materials={["red_sphere"]}
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.03}
              position={[0.1, 0.25, 0]}
              onClick={this._selectRed}
              animation={{
                name: "tapAnimation",
                run: this.state.tapRed,
                onFinish: this._animateFinished
              }}
              shadowCastingBitMask={0}
            />

            <ViroSphere
              materials={["yellow_sphere"]}
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.03}
              position={[0.2, 0.25, 0]}
              onClick={this._selectYellow}
              animation={{
                name: "tapAnimation",
                run: this.state.tapYellow,
                onFinish: this._animateFinished
              }}
              shadowCastingBitMask={0}
            />
          </ViroNode>
          <ViroNode 
            rotation={this.state.rotation} 
            ref={this._setARNodeRef}
            scale={[1, 1, 1]}
            animation={{ name: this.state.carAnimName[0], run: this.state.carPlayAnim[0], onFinish: () => this._onCarAnimationFinish(0) }}>
            <Viro3DObject
              scale={[0.09, 0.09, 0.09]}
              source={require("./res/tesla/object_car.obj")}
              resources={[require("./res/tesla/object_car.mtl")]}
              type="OBJ"
              materials={this.state.texture}
              onClick={this._toggleButtons}
              onRotate={this._onRotate}
            />
          </ViroNode>
          <ViroNode 
            position={[0,0, 0]}
            rotation={this.state.rotation} 
            ref={this._setARNodeRef}
            scale={[1, 1, 1]}
            animation={{ name: this.state.carAnimName[1], run: this.state.carPlayAnim[1], onFinish: () => this._onCarAnimationFinish(1) }}>
            <Viro3DObject
              scale={[0.09, 0.09, 0.09]}
              source={require("./res/tesla/object_car.obj")}
              resources={[require("./res/tesla/object_car.mtl")]}
              type="OBJ"
              materials={this.state.texture}
              onClick={this._toggleButtons}
              onRotate={this._onRotate}
            />
          </ViroNode>

          <ViroSpotLight
            innerAngle={5}
            outerAngle={25}
            direction={[0, -1, 0]}
            position={[0, 5, 1]}
            color="#ffffff"
            castsShadow={true}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={7}
            shadowOpacity={0.7}
          />

          <ViroQuad
            rotation={[-90, 0, 0]}
            position={[0, -0.001, 0]}
            width={2.5}
            height={2.5}
            arShadowReceiver={true}
          />
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  },
  _onAnchorFound(anchor) {
    // console.log('This is from onAnchorFound function -->', JSON.stringify(anchor))
    // this._setCarPosition(anchor.center)
    this.setState({
      animateCar: true
    });
  },
  _setARNodeRef(component) {
    this.arNodeRef = component;
  },
  _onRotate(rotateState, rotationFactor, source) {

    if (rotateState == 3) {
      this.setState({
        rotation : [this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]]
      });
      return;
    }

    this.arNodeRef.setNativeProps({rotation:[this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]]});
  },

  _toggleButtons() {
    this.setState({
      animName: this.state.animName == "scaleUp" ? "scaleDown" : "scaleUp",
      playAnim: true
    });
  },
  _onCarAnimationFinish(n) {
    console.log('`_onCarAnimationFinish` called')
    console.log('before state change state->', this.state)
    this.setState({
      carPlayAnim: [...this.state.carPlayAnim.slice(0,n), false, ...this.state.carPlayAnim.slice(n+1)]
    }, () => console.log('after state change state->', this.state))
    
  },
  _moveOutCar(direction) {
    console.log('`_moveOutCar` called')
    console.log('before state change state->', this.state)
      this.setState({
        carAnimName: this.state.carAnimName.map(() => direction),
        // carAnimName: [...this.state.carAnimName.slice(0,n), this.state.carAnimName[n] == "moveOutCar" ? "moveInCar" : "moveOutCar", ...this.state.carAnimName.slice(n+1)],
        carPlayAnim: this.state.carPlayAnim.map(()=> true)
        // carPlayAnim: [...this.state.carPlayAnim.slice(0,n), true, ...this.state.carPlayAnim.slice(n+1)]
      }, () => console.log('after state change state->', this.state));
    
    
  },
  _pervCar() {    
    console.log('prev car navigation')
    this._moveOutCar('moveOutCar')
  },
  _nextCar() {
    console.log('next car navigation')
    this._moveOutCar('moveInCar')
  },
  _selectWhite() {
    this.setState({
      texture: "white",
      tapWhite: true
    });
  },
  _selectBlue() {
    this.setState({
      texture: "blue",
      tapBlue: true
    });
  },
  _selectGrey() {
    this.setState({
      texture: "grey",
      tapGrey: true
    });
  },
  _selectRed() {
    this.setState({
      texture: "red",
      tapRed: true
    });
  },
  _selectYellow() {
    this.setState({
      texture: "yellow",
      tapYellow: true
    });
  },
  _animateFinished() {
    this.setState({
      tapWhite: false,
      tapBlue: false,
      tapGrey: false,
      tapRed: false,
      tapYellow: false
    });
  }
});

ViroMaterials.createMaterials({
  white: {
    lightingModel: "PBR",
    diffuseTexture: require("./res/tesla/object_car_main_Base_Color.png"),
    metalnessTexture: require("./res/tesla/object_car_main_Metallic.png"),
    roughnessTexture: require("./res/tesla/object_car_main_Roughness.png")
  },
  blue: {
    lightingModel: "PBR",
    diffuseTexture: require("./res/tesla/object_car_main_Base_Color_blue.png"),
    metalnessTexture: require("./res/tesla/object_car_main_Metallic.png"),
    roughnessTexture: require("./res/tesla/object_car_main_Roughness.png")
  },
  grey: {
    lightingModel: "PBR",
    diffuseTexture: require("./res/tesla/object_car_main_Base_Color_grey.png"),
    metalnessTexture: require("./res/tesla/object_car_main_Metallic.png"),
    roughnessTexture: require("./res/tesla/object_car_main_Roughness.png")
  },
  red: {
    lightingModel: "PBR",
    diffuseTexture: require("./res/tesla/object_car_main_Base_Color_red.png"),
    metalnessTexture: require("./res/tesla/object_car_main_Metallic.png"),
    roughnessTexture: require("./res/tesla/object_car_main_Roughness.png")
  },
  yellow: {
    lightingModel: "PBR",
    diffuseTexture: require("./res/tesla/object_car_main_Base_Color_yellow.png"),
    metalnessTexture: require("./res/tesla/object_car_main_Metallic.png"),
    roughnessTexture: require("./res/tesla/object_car_main_Roughness.png")
  },
  white_sphere: {
    lightingModel: "PBR",
    diffuseColor: "rgb(231,231,231)"
  },
  blue_sphere: {
    lightingModel: "PBR",
    diffuseColor: "rgb(19,42,143)"
  },
  blue_plane: {
    lightingModel: "PBR",
    diffuseColor: "rgb(19,42,143)"
  },
  grey_sphere: {
    lightingModel: "PBR",
    diffuseColor: "rgb(75,76,79)"
  },
  red_sphere: {
    lightingModel: "PBR",
    diffuseColor: "rgb(168,0,0)"
  },
  yellow_sphere: {
    lightingModel: "PBR",
    diffuseColor: "rgb(200,142,31)"
  }
});

ViroARTrackingTargets.createTargets({
  logo: {
    source: require("./res/logo.png"),
    orientation: "Up",
    physicalWidth: 0.165 // real world width in meters
  }
});

ViroAnimations.registerAnimations({
  moveOutCar: {
    properties: {positionX: "-=0.5" },
    // properties: {positionX: "-=4", scaleX: 0, scaleY: 0, scaleZ: 0 },
    duration: 500,
    easing: "easeineaseout"
  },
  moveInCar: {
    properties: {positionX: "+=0.5" },
    // properties: {positionX: "+=4", scaleX: 1, scaleY: 1, scaleZ: 1 },
    duration: 500,
    easing: "easeineaseout"
  },
  scaleUp: {
    properties: { scaleX: 1, scaleY: 1, scaleZ: 1 },
    duration: 500,
    easing: "bounce"
  },
  scaleDown: { properties: { scaleX: 0, scaleY: 0, scaleZ: 0 }, duration: 200 },
  scaleCar: {
    properties: { scaleX: 0.09, scaleY: 0.09, scaleZ: 0.09 },
    duration: 500,
    easing: "bounce"
  },
  scaleSphereUp: {
    properties: { scaleX: 0.8, scaleY: 0.8, scaleZ: 0.8 },
    duration: 50,
    easing: "easeineaseout"
  },
  scaleSphereDown: {
    properties: { scaleX: 1, scaleY: 1, scaleZ: 1 },
    duration: 50,
    easing: "easeineaseout"
  },
  tapAnimation: [["scaleSphereUp", "scaleSphereDown"]],
  rotate: {
    properties: { rotateY: "+=90" },
    duration: 250 //.25 seconds
  }
});

module.exports = ARCarDemo;
