import Variables from "../../assets/styles/Variables";
import Tabs from "../../assets/styles/Tabs";

export default {
  container: {
    flex: 1,
    backgroundColor: Variables.colors.background
  },
  background: {
    padding: 20,
    paddingBottom: 30,
    flex: 1
  },
  containerView: {
    flex: 1
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20
  },
  title: {
    fontSize: Variables.fontSizes.titleCommon,
    color: Variables.colors.title,
    fontFamily: Variables.fonts.primaryBold
  },
  buttonIconSize: Variables.sizes.buttonIcon,
  buttonIconColor: Variables.colors.plusIcon,
  dataContainer: {
    marginTop: 5,
    flex: 1
  },
  dataText: {
    color: Variables.colors.white
  },
  scroll: {
    flex: 1
  },
  tabs: Tabs.tabs,
  headerTab: Tabs.headerTab2,
  firstTab: Tabs.firstTab,
  lastTab: Tabs.lastTab,
  tab: Tabs.tab,
  tabActive: Tabs.tabActive,
  tabTextActive: Tabs.tabTextActive,
  tabText: Tabs.tabText,
  tabView: Tabs.tabView,
  headerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  headerCol: {
    alignItems: "center",
    justifyContent: "center",
    width: '50%',
    padding: 5
  },
  headerColBorder: {
    borderRightWidth: Variables.sizes.border,
    borderRightColor: Variables.colors.white,
    borderRightStyle: "solid"
  },
  headerTitle: {
    fontSize: Variables.fontSizes.textCommon,
    color: Variables.colors.white,
    fontFamily: Variables.fonts.primaryBold
  },
  headerText: {
    fontSize: Variables.fontSizes.textCommon,
    color: Variables.colors.white
  },
  bar: {
    marginTop: 15,
    marginBottom: 5
  },
  labelsContainer: {
    flex: 1,
    marginBottom: 10
  },
  emptyList: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40
  },
  emptyListText: {
    color: Variables.colors.white,
    fontSize: Variables.fontSizes.textCommon
  },
  evolutionForm: {
    height: 80,
    marginRight: -5,
    marginLeft: -5
  },
  evolutionData: {
    flex: 1
  },
  photos: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  photo: {
    marginBottom: 10,
    borderRadius: Variables.radius.medium,
    resizeMode: "contain",
    width: 150,
    height: 150
  },
  newButton: {
    alignItems: "center",
    justifyContent: "center"
  }
};