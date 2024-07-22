This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Clone the repo
```bash
git clone https://github.com/iskaa02/speetar && cd speetar
```
2. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

> The app has been tested on Android emulator and Physical device using expo go

## Adding Google api key
Create a .env file in the root directory and add the following line
```
EXPO_PUBLIC_GOOGLE_API_KEY="YOUR API KEY"
```
To generate a new key follow the instructions
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing project
3. Make Sure to Enable the [Maps SDK for Android](https://console.cloud.google.com/marketplace/product/google/maps-android-backend.googleapis.com), [Maps SDK for iOS](https://console.cloud.google.com/marketplace/product/google/maps-ios-backend.googleapis.com) And [Places API (New)](https://console.cloud.google.com/marketplace/product/google/places.googleapis.com)
4. Go to the [APIs & Services > Credentials](https://console.cloud.google.com/apis/credentials) page
5. Click Create credentials > API key
6. Copy the API key and paste it in the .env file

By default the API key is not restricted, it can use any service. if you want to restrict the key make sure that the key can access the Maps SDK for Android, Maps SDK for iOS, Places API (New)

> Note: Places API (New) is Not the same as Places API, make sure to enable the correct one
