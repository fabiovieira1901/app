import React, { Component } from 'react';
import { View, ImageBackground, Text, Image } from 'react-native';
import SvgIcon from '../../components/SvgIcon/SvgIcon';
import Button from '../../components/Button/Button';
import Styles from './ForgotPasswordSuccessStyles';


class ForgotPasswordSuccess extends Component {
    constructor(props) {
        super(props);
    }

    goBack = () => {
        this.props.navigation.goBack(null);
    }

    render() {
        return (
            <View style={Styles.container}>
                <ImageBackground style={Styles.background}>
                    <View style={Styles.imageContainer}>
                        <Image style={Styles.image}
                            source={require('../../assets/images/logo.png')} />
                    </View>
                    <View style={Styles.secondaryBackground}>
                        <View>
                            <Text style={Styles.title}>
                                {window.strings['please_check_inbox_or_spam']}
                            </Text>
                        </View>
                        <View>
                            <SvgIcon style={Styles.logoImage} icon={'email'} />
                        </View>
                        <View>
                            <Text style={Styles.subtitle}>
                                {window.strings['received_email_with_access_data']}
                            </Text>
                        </View>
                        <View style={Styles.button}>
                            <Button callback={this.goBack}
                                secondary={true}
                                text={window.strings['finish']} />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

export default ForgotPasswordSuccess;