# Orderbook

[![build](https://github.com/demchenkoalex/orderbook/actions/workflows/build.yml/badge.svg)](https://github.com/demchenkoalex/orderbook/actions/workflows/build.yml)

![Demo](https://user-images.githubusercontent.com/14123304/116395068-eee15a80-a823-11eb-8873-f2f92f91d74b.gif)

Install dependencies using `yarn` and either `npx pod-install` or `cd ios && pod install`

Use `yarn ios` to run on the iOS simulator (add signing in the Xcode to run on the device). If it doesn't work try to build from Xcode directly.

Use `yarn android` to run on the Android device/emulator

User `yarn test` to run tests

Please note that there is an issue with Flipper and Xcode 12.5 (tracked here) https://github.com/facebook/react-native/issues/31179 (probably Flipper will need to be updated in `ios/Podfile`), so the build might fail in the newest Xcode (should work in Xcode 12.4). Also, I'm using M1 mac and since they are still pretty new, something that works for me might not work on Intel, but it should, I was using my Swift/Kotlin template which my friends also were using on Intel macs.
