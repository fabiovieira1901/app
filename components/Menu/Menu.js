import React, { Component } from "react";
import {
	Modal, View, ImageBackground, Text,
	TouchableOpacity, Image, Linking
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import Api from '../../services/api/Api';
import Storage from '../../storage/storage';
import SvgIcon from '../../components/SvgIcon/SvgIcon';
import ImagesBase64 from '../../assets/images/ImagesBase64';
import Styles from './MenuStyles';


export default class Menu extends Component {
	render() {
		let { menuVisible } = this.props;
		let { callbackClose } = this.props;
		let { navigation } = this.props;

		return (
			<Modal
				animationType="slide"
				animationDirection="top"
				transparent={true}
				visible={menuVisible}
			>
				<View style={Styles.centeredView}>
					<View style={Styles.modalView}>
						<ImageBackground style={Styles.background}>
							<TouchableOpacity activeOpacity={0.8}
								onPress={function () {
									callbackClose();
								}}
								style={Styles.header}>
								<SvgIcon icon={'close'} />
							</TouchableOpacity>

							<View style={Styles.headerLogo}>
								<Image style={[Styles.userPhoto,
                                    ImagesBase64.user == window.userPhoto ?
                                        Styles.noUserPhoto : null]}
                                    source={{ uri: window.userPhoto }} />
							</View>

							<View style={Styles.body}>
								<TouchableOpacity activeOpacity={0.8}
									onPress={function () {
										navigation.navigate('UserDetails');
										callbackClose();
									}} style={Styles.button}>
									<FontAwesome5 name="user-alt" size={Styles.iconSize}
										color={Styles.iconColor} />
									<Text style={Styles.buttonText}>
										{window.strings['profile']}
									</Text>
								</TouchableOpacity>
								<TouchableOpacity activeOpacity={0.8}
									onPress={function () {
										navigation.navigate('ReportIssue');
										callbackClose();
									}} style={Styles.button}>
									<FontAwesome5 name="bug" size={Styles.iconSize}
										color={Styles.iconColor} />
									<Text style={Styles.buttonText}>
										{window.strings['report_issue']}
									</Text>
								</TouchableOpacity>
								<TouchableOpacity activeOpacity={0.8}
									onPress={function () {
										Linking.openURL('https://ptclient.mkgest.com/app/milenemartins/terms.pdf');
										callbackClose();
									}} style={Styles.button}>
									<FontAwesome5 name="info-circle" size={Styles.iconSize}
										color={Styles.iconColor} />
									<Text style={Styles.buttonText}>
										{window.strings['terms_and_conditions']}
									</Text>
								</TouchableOpacity>
								<TouchableOpacity activeOpacity={0.8}
									onPress={function () {
										Linking.openURL('https://ptclient.mkgest.com/app/milenemartins/privacy.pdf');
										callbackClose();
									}} style={Styles.button}>
									<FontAwesome5 name="info-circle" size={Styles.iconSize}
										color={Styles.iconColor} />
									<Text style={Styles.buttonText}>
										{window.strings['privacy_policy']}
									</Text>
								</TouchableOpacity>
								<TouchableOpacity activeOpacity={0.8}
									onPress={function () {
										Api.logout(function () {
											Storage.clearStorage();
											navigation.replace('Welcome');
										});
										callbackClose();
									}} style={Styles.button}>
									<FontAwesome5 name="sign-out-alt" size={Styles.iconSize}
										color={Styles.iconColor} />
									<Text style={Styles.buttonText}>
										{window.strings['logout']}
									</Text>
								</TouchableOpacity>
							</View>
							<View style={Styles.mkgest}>
								<TouchableOpacity activeOpacity={0.8}
									onPress={function () {
										Linking.openURL('https://mkgest.com');
									}} style={Styles.mkgestButton}>
									<Image style={Styles.mkgestImage}
										source={require('../../assets/images/mkgest.png')} />
									<Text style={Styles.mkgestText}>
										{window.strings['mkgest']}
									</Text>
								</TouchableOpacity>
							</View>
						</ImageBackground>
					</View>
				</View>
			</Modal>
		);
	}
}