import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';

// Screens
import Welcome from './screens/Welcome/WelcomeScreen';
import Login from './screens/Login/LoginScreen';
import Register from './screens/Register/RegisterScreen';
import ForgotPassword from './screens/ForgotPassword/ForgotPasswordScreen';
import ForgotPasswordSuccess from './screens/ForgotPasswordSuccess/ForgotPasswordSuccessScreen';
import UserDetails from './screens/UserDetails/UserDetailsScreen';
import Subscription from './screens/Subscription/SubscriptionScreen';
import Settings from './screens/Settings/SettingsScreen';
import ReportIssue from './screens/ReportIssue/ReportIssueScreen';
/* Client */
import Home from './screens/Home/HomeScreen';
import TrainingPlans from './screens/TrainingPlans/TrainingPlansScreen';
import TrainingPlan from './screens/TrainingPlan/TrainingPlanScreen';
import TrainingExercises from './screens/TrainingExercises/TrainingExercisesScreen';
import PhysicalEvaluations from './screens/PhysicalEvaluations/PhysicalEvaluationsScreen';
import PhysicalEvaluation from './screens/PhysicalEvaluation/PhysicalEvaluationScreen';
import NewPhysicalEvaluation from './screens/NewPhysicalEvaluation/NewPhysicalEvaluationScreen';
import Nutrition from './screens/Nutrition/NutritionScreen';
import NutritionDay from './screens/NutritionDay/NutritionDayScreen';
import NutritionMeal from './screens/NutritionMeal/NutritionMealScreen';
import Video from './screens/Video/VideoScreen';
import Exercise from './screens/Exercise/ExerciseScreen';
import Contents from './screens/Contents/ContentsScreen';
import Content from './screens/Content/ContentScreen';
import Supplements from './screens/Supplements/SupplementsScreen';
import Notifications from './screens/Notifications/NotificationsScreen';
import PhysicalTherapy from './screens/PhysicalTherapy/PhysicalTherapyScreen';
import Menu from './screens/Menu/MenuScreen';

// Components
import Header from './components/Header/Header'
import SvgIcon from './components/SvgIcon/SvgIcon'

// Services
import Axis from './services/config/axis.js';

// Fonts
import { useFonts } from 'expo-font';
import GlobalFont from 'react-native-global-font'
import Variables from './assets/styles/Variables';

// Components
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabComponent = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon, iconColor, withArch;

          if (route.name === 'Home') {
            icon = 'tab_home';
            withArch = true;
          }

          if (route.name === 'TrainingPlans') {
            icon = 'tab_training_plan';
          }

          if (route.name === 'Menu') {
            icon = 'tab_menu';
          }

          if (route.name === 'PhysicalEvaluations') {
            icon = 'tab_physical_evaluations';
          }

          if (route.name === 'Nutrition') {
            icon = 'tab_nutrition';
          }

          if (withArch) {
            return <View style={{ width: 50, height: 50 }}>
              <Image style={{ position: "absolute", bottom: 1, left: -10, width: 70, height: 70, resizeMode: "contain" }}
                source={require('./assets/images/home.png')} />
              <SvgIcon icon={icon} color={color}
                style={{ elevation: 5, zIndex: 5, position: "absolute", bottom: 17, left: 5.2 }} />
            </View>
          } else {
            return <View style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}>
              <SvgIcon icon={icon} color={color} />
            </View>;
          }
        },
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: Variables.colors.tabActive,
        inactiveTintColor: Variables.colors.tabInactive,
        style: {
          backgroundColor: Variables.colors.primary,
          borderTopColor: Variables.colors.secondary
        },
        labelStyle: {
          marginBottom: 5
        }
      }}
    >
      <Tab.Screen component={TrainingPlans} name="TrainingPlans" />
      <Tab.Screen component={Nutrition} name="Nutrition" />
      <Tab.Screen component={Home} name="Home" />
      <Tab.Screen component={PhysicalEvaluations} name="PhysicalEvaluations" />
      <Tab.Screen component={Menu} name="Menu" />
    </Tab.Navigator>
  );
};

const TabContentsComponent = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Variables.colors.tabActive,
        tabBarInactiveTintColor: Variables.colors.tabInactive,
        tabBarStyle: {
          backgroundColor: Variables.colors.primary,
          borderTopColor: Variables.colors.secondary
        },
        tabBarLabelStyle: {
          marginBottom: 5
        },
        tabBarIcon: ({ focused, color, size }) => {
          let icon, iconColor, withArch;

          if (route.name === 'Home') {
            icon = 'tab_home';
            withArch = true;
          }

          if (route.name === 'TrainingPlans') {
            icon = 'tab_training_plan';
          }

          if (route.name === 'Contents') {
            icon = 'tab_contents';
          }

          if (route.name === 'PhysicalEvaluations') {
            icon = 'tab_physical_evaluations';
          }

          if (route.name === 'Nutrition') {
            icon = 'tab_nutrition';
          }

          if (withArch) {
            return <View style={{ width: 50, height: 50 }}>
              <Image style={{ position: "absolute", bottom: 1, left: -10, width: 70, height: 70, resizeMode: "contain" }}
                source={require('./assets/images/home.png')} />
              <SvgIcon icon={icon} color={color}
                style={{ elevation: 5, zIndex: 5, position: "absolute", bottom: 17, left: 5.2 }} />
            </View>
          } else {
            return <View style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}>
              <SvgIcon icon={icon} color={color} />
            </View>;
          }
        },
      })}
    >
      <Tab.Screen component={TrainingPlans} name="TrainingPlans" />
      <Tab.Screen component={Nutrition} name="Nutrition" />
      <Tab.Screen component={Home} name="Home" />
      <Tab.Screen component={PhysicalEvaluations} name="PhysicalEvaluations" />
      <Tab.Screen component={Contents} name="Contents" />
    </Tab.Navigator>
  );
};


export default function App() {
  let [fontsLoaded] = useFonts({
    'font-regular': require('./assets/fonts/montserrat-regular.ttf'),
    'font-bold': require('./assets/fonts/montserrat-bold.ttf')
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(function () {
      SplashScreen.hideAsync();
    }, 500);
  }, []);

  if (!fontsLoaded) {
    return <View></View>;
  } else {
    GlobalFont.applyGlobal(Variables.fonts.primary);

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          gestureEnabled: false,
          cardStyle: {
            backgroundColor: Variables.colors.background
          }
        }}>

          {/* Screens */}
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={({ route }) => ({
              headerShown: false
            })}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={({ route }) => ({
              headerShown: false
            })}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={({ route }) => ({
              headerShown: false
            })}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={({ route }) => ({
              headerShown: false
            })}
          />
          <Stack.Screen
            component={ForgotPasswordSuccess}
            name="ForgotPasswordSuccess"
            options={({ route }) => ({
              headerShown: false
            })}
          />
          <Stack.Screen
            component={UserDetails}
            name="UserDetails"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={Subscription}
            name="Subscription"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={Settings}
            name="Settings"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={ReportIssue}
            name="ReportIssue"
            options={({ route }) => (Header.backButton)}
          />

          {/* Client */}
          <Stack.Screen
            component={TrainingPlan}
            name="TrainingPlan"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={TrainingExercises}
            name="TrainingExercises"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={Exercise}
            name="Exercise"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={PhysicalEvaluation}
            name="PhysicalEvaluation"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={NewPhysicalEvaluation}
            name="NewPhysicalEvaluation"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={NutritionDay}
            name="NutritionDay"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={NutritionMeal}
            name="NutritionMeal"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={Video}
            name="Video"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={Menu}
            name="Menu"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={Content}
            name="Content"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={Supplements}
            name="Supplements"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={Notifications}
            name="Notifications"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={PhysicalTherapy}
            name="PhysicalTherapy"
            options={({ route }) => (Header.backButton)}
          />

          {/* Tabs pages */}
          <Stack.Screen
            component={Home}
            name="Home"
            options={({ route }) => (Header.home)}
          />
          <Stack.Screen
            component={TrainingPlans}
            name="TrainingPlans"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={Nutrition}
            name="Nutrition"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={PhysicalEvaluations}
            name="PhysicalEvaluations"
            options={({ route }) => (Header.backButton)}
          />
          <Stack.Screen
            component={Contents}
            name="Contents"
            options={({ route }) => (Header.backButton)}
          />

          {/* Tabs */}
          <Stack.Screen
            name="Tabs"
            component={TabComponent}
            options={({ route }) => (Header.onlyMenu)}
          />
          <Stack.Screen
            name="TabContents"
            component={TabContentsComponent}
            options={({ route }) => (Header.onlyMenu)}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}