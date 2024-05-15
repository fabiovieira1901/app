import Variables from "../../assets/styles/Variables";
import Tabs from "../../assets/styles/Tabs";

export default {
  container: {
    flex: 1,
    backgroundColor: Variables.colors.background
  },
  background: {
    padding: 20,
    flex: 1
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10
  },
  title: {
    fontSize: Variables.fontSizes.titleCommon,
    color: Variables.colors.title,
    fontFamily: Variables.fonts.primaryBold,
    marginRight: 5,
    flex: 1
  },
  description: {
    marginTop: 10,
    backgroundColor: Variables.colors.backgroundPrimary,
    borderRadius: Variables.radius.medium,
    padding: 10
  },
  descriptionText: {
    fontSize: Variables.fontSizes.textCommon,
    color: Variables.colors.white,
    flexShrink: 1
  },
  videoButton: {
    marginTop: 20
  },
  containerView: {
    flex: 1
  },
  dataContainer: {
    marginTop: 5,
    flex: 1
  },
  imageCol: {
    width: 70
  },
  imageElement: {
    width: 60,
    height: 60
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
  list: {
    flex: 1,
  }
};