import React, { Component } from 'react';
import { View, ImageBackground, Text, BackHandler, Linking } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import Api from '../../services/api/Api';
import UtilsApi from '../../services/utils/utils';
import List from '../../components/List/List';
import Select from '../../components/Select/Select';
import Styles from './ContentsStyles';


class Contents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tab: 0,
            supplementType: 100,
            types: JSON.parse(JSON.stringify(UtilsApi.getContentTypes())),
            tabsData: {},
            data: null
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const self = this;

        this._unsubscribeFocus = navigation.addListener('focus', () => {

            self._unsubscribeEvent = EventRegister.addEventListener('header-left-click', () => {
                self.handleBackButton(navigation);
            });

            self._unsubscribeHomeEvent = EventRegister.addEventListener('home-click', () => {
                UtilsApi.backHome(navigation);
            });

            BackHandler.addEventListener('hardwareBackPress', function () {
                self.handleBackButton(navigation);
                return true;
            });
        });

        this._unsubscribeBlur = navigation.addListener('blur', () => {
            if (self._unsubscribeEvent) {
                EventRegister.removeEventListener(self._unsubscribeEvent);
            }

            if (self._unsubscribeHomeEvent) {
                EventRegister.removeEventListener(self._unsubscribeHomeEvent);
            }

            BackHandler.removeEventListener('hardwareBackPress', function () {
                self.handleBackButton(navigation);
                return true;
            });
        });

        this.getData();
    }

    componentWillUnmount() {
        this._unsubscribeFocus();
        this._unsubscribeBlur();

        if (this._unsubscribeEvent) {
            EventRegister.removeEventListener(this._unsubscribeEvent);
        }

        if (this._unsubscribeHomeEvent) {
            EventRegister.removeEventListener(this._unsubscribeHomeEvent);
        }
    }

    handleBackButton(navigation) {
        navigation.goBack(null);
        return true;
    }

    getData = () => {
        const self = this;
        const tabsData = {};

        this.setState({
            data: null,
            loading: true
        });

        Api.getContents({
            excludeType: this.state.supplementType,
            photo: true
        }, function (response) {
            if (response.success) {
                for (let i = 0; i < response.data.length; i++) {
                    if (!tabsData[response.data[i].type]) {
                        tabsData[response.data[i].type] = [];
                    }
                    tabsData[response.data[i].type].push({
                        id: response.data[i].id,
                        name: response.data[i].name,
                        description: response.data[i].description,
                        image: response.data[i].image,
                        urls: self.getContentUrls(response.data[i]),
                        pdf: response.data[i].pdf
                    });
                }
                self.setState({
                    tabsData: tabsData,
                    types: self.state.types,
                    tab: self.state.types[0] ? self.state.types[0].value : 0
                });
                setTimeout(function () {
                    self.setState({
                        loading: false
                    });
                    self.showTab(self.state.tab);
                });
            } else {
                self.setState({
                    loading: false
                });
            }
        });
    }

    getContentUrls = (content) => {
        try {
            const urls = JSON.parse(content.url);
            return urls ? urls : [];
        } catch (error) {
            if (content.url) {
                return [content.url];
            } else {
                return [];
            }
        }
    }

    openContent = (item) => {
        const url = item.urls.length == 1 ? item.urls[0] : null;
        if (url && typeof url == 'string' &&
            url.indexOf('youtube.com') == -1 &&
            url.indexOf('youtu.') == -1 &&
            !item.pdf && !item.description
        ) {
            Linking.openURL(url);
        } else {
            this.props.navigation.navigate('Content', {
                data: item
            });
        }
    }

    showTab = (tab) => {
        this.setState({
            tab: tab,
            data: this.state.tabsData[tab]
        });
    }

    render() {
        const self = this;
        return (
            <View style={Styles.container}>
                <ImageBackground
                    source={require("../../assets/images/background_contents.jpg")}
                    style={Styles.background}
                >
                    <View style={Styles.titleContainer}>
                        <Text style={Styles.title}>
                            {window.strings['contents']}
                        </Text>
                    </View>

                    <View style={Styles.containerView}>
                        <View style={Styles.dataContainer}>
                            {this.state.types && this.state.types.length > 1 ?
                                <View style={Styles.select}>
                                    <Select
                                        dark={true}
                                        selectedValue={this.state.tab}
                                        items={this.state.types}
                                        onValueChange={function (itemValue) {
                                            self.showTab(itemValue);
                                        }}
                                    ></Select>
                                </View> : null}

                            <View style={Styles.list}>
                                <List data={this.state.data ? this.state.data : []}
                                    callbackRefresh={this.getData}
                                    loading={this.state.loading}
                                    emptyMessage={window.strings['contents_empty']}
                                    callbackOpen={this.openContent}
                                    boxs={true}
                                    showImage={true}
                                    boxStyle={Styles.listBox}
                                    contentStyle={Styles.listItem}
                                    titleStyle={Styles.listItemTitle}
                                    descriptionStyle={Styles.listItemDescription}
                                />
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

export default Contents;