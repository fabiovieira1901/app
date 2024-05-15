import React, { Component } from "react";
import { Modal, View, Text } from "react-native";
import Button from '../../components/Button/Button';
import Photo from '../../components/Photo/Photo';
import Styles from './ModalSendPaymentStyles';


export default class ModalSendPayment extends Component {
	constructor(props) {
        super(props);
        this.state = {
            image: null
        };
	}

	render() {
		const self = this;
		let { visible } = this.props;
		let { mainTitle } = this.props;
		let { callbackCancel } = this.props;
		let { callbackConfirm } = this.props;

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
							<Text style={Styles.textElement}>
								{mainTitle}
							</Text>
						</View>
						<View style={Styles.photoContainer}>
							<Photo
								callback={function (photoBase64) {
									self.setState({
										image: photoBase64
									});
								}}
								photo={this.state.image}
								imageSize={500}
								width={200} height={200} />
						</View>
						<View style={Styles.buttons}>
							<Button text={window.strings['cancel']}
								callback={callbackCancel}
								buttonStyles={[Styles.button, Styles.buttonLeft]}
								buttonTextStyles={Styles.buttonDangerText} />
							<Button text={window.strings['confirm']}
								callback={function () {
									callbackConfirm(self.state.image)
								}}
								buttonStyles={[Styles.button, Styles.buttonRight,
									this.state.image ? null : Styles.disabled]}
								buttonTextStyles={Styles.buttonSuccessText} />
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}