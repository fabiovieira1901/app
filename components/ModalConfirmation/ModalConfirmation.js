import React, { Component } from "react";
import { Modal, View, Text } from "react-native";
import Button from '../../components/Button/Button';
import Styles from './ModalConfirmationStyles';


export default class ModalConfirmation extends Component {
	render() {
		let { visible } = this.props;
		let { text } = this.props;
		let { callbackCancel } = this.props;
		let { textCancel } = this.props;
		let { callbackConfirm } = this.props;
		let { textConfirm } = this.props;
		let { callbackThirdButton } = this.props;
		let { thirdButtonText } = this.props;

		return (
			<Modal
				animationType="slide"
				animationDirection="top"
				transparent={true}
				visible={visible}
			>
				<View style={Styles.modalView}>
					<View style={Styles.centeredView}>
						<View style={Styles.text}>
							{text ?
								<Text style={Styles.textElement}>
									{text}
								</Text> :
								<Text style={Styles.textElement}>
									{window.strings['are_you_sure_delete']}
								</Text>
							}
						</View>
						<View style={[Styles.buttons, callbackThirdButton ? Styles.threeButtons : null]}>
							<Button callback={callbackCancel}
								buttonStyles={[Styles.button,
									Styles.buttonLeft, callbackThirdButton ? Styles.threeButton : null]}
								buttonTextStyles={Styles.buttonDangerText}
								text={textCancel ? textCancel : window.strings['no']} />
							<Button callback={callbackConfirm}
								buttonStyles={[Styles.button,
									Styles.buttonRight, callbackThirdButton ? Styles.threeButton : null]}
								buttonTextStyles={Styles.buttonSuccessText}
								text={textConfirm ? textConfirm : window.strings['yes']} />
							{callbackThirdButton ?
								<Button callback={callbackThirdButton}
									buttonStyles={[Styles.button,
										Styles.buttonThird, callbackThirdButton ? Styles.threeButton : null]}
									buttonTextStyles={Styles.buttonThirdText}
									text={thirdButtonText ? thirdButtonText : window.strings['yes']} /> : null}
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}