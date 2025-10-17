import React from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import useChatScreen from './useChatScreen';
import { styles } from './styles';
import {
  arrDown,
  attachmentIcon,
  cameraGray,
  radioEmpty,
  radioFill,
  sendIcon,
  trashRed,
} from '../../Assets';
import { hp, wp } from '../../Hooks/useResponsive';
import { SearchBar } from '@rneui/themed';
import BtnModalComponent from '../../Components/BtnModalComp';
import { getUrlType } from '../../Services/GlobalFunctions';
import { TextComponent } from '../../Components/TextComponent';
import { Touchable } from '../../Components/Touchable';
import { Colors } from '../../Theme/Variables';
import RenderHTML from 'react-native-render-html';

const ChatScreen = ({ route, navigation }) => {
  console.log('routerouterouterouterouterouterouterouterouteroute', route);
  const {
    messages,
    inputText,
    setInputText,
    handleSendMessage,
    handleFilePick,
    onChangeVal,
    apiAllData,
    StatusOptions,
    ChildMessages,
    ChildSummary,
    arrySelector,
    selectTag,
    modalState,
    setModalState,
    brCode,
    apiStatusOptions,
    changeStatus,
    postBarCode,
    deleteChat,
    postMeg,
    handleCameraPick,
  } = useChatScreen(route);

  const OrderCard = () => {
    const source = {
      html: `${apiAllData?.BoardMessage?.message}`,
    };

    function hasHtmlTags(str) {
      // Regex to detect any HTML tag like <tag> or <tag attr="">
      const regex = /<[^>]+>/g;
      return regex.test(str);
    }

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.name}>{apiAllData?.BoardMessage?.name}</Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 0.5,
              borderRadius: 5,
              paddingHorizontal: wp('1'),
            }}
            onPress={() => {
              setModalState('StatusOptions');
            }}
          >
            <Text style={styles.status}>
              {StatusOptions?.label ??
                apiStatusOptions?.filter(res => res?.selected)[0]?.label}
            </Text>
            <Image
              source={arrDown}
              resizeMode="contain"
              style={{ width: wp('3'), height: hp('2.5'), marginLeft: wp('1') }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => changeStatus()}
          >
            <Text style={styles.buttonText}>Change</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRed}
            onPress={() => {
              navigation.navigate('ListTableScreen', {
                headerArry: ['name', 'status', 'date'],
                body: {
                  gotoChatStatusLog: StatusOptions?.id,
                  gotoChatStatusLogPrIDAjax: apiAllData?.BoardMessage?.id,
                  rqst_ke_fntn_vl: 'issue_forum_view_log',
                },
              });
            }}
          >
            <Text style={styles.buttonText}>ViewLog</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: hp('2'),
          }}
        >
          <Text style={styles.date}>
            {apiAllData?.BoardMessage?.created_at_wd_time}
          </Text>
          <Touchable
            onPress={() => deleteChat('parent', apiAllData?.BoardMessage?.id)}
          >
            <Image
              source={trashRed}
              resizeMode="contain"
              style={{ width: wp('6'), height: hp('2.5') }}
            />
          </Touchable>
        </View>
        <Text style={styles.orderId}>{apiAllData?.BoardMessage?.order_id}</Text>
        {hasHtmlTags(apiAllData?.BoardMessage?.message ?? '') ? (
          <RenderHTML
            baseStyle={{
              // width: wp('90'),
              // alignSelf: 'center',
              // marginTop: hp('1'),
              fontSize: hp('1.5'),
              color: Colors.primaryColor,
            }}
            contentWidth={hp('90')}
            source={source}
            enableExperimentalMarginCollapsing={true}
            // allowedStyles={true}
            enableCSSInlineProcessing={true}
          />
        ) : (
          <TextComponent
            text={apiAllData?.BoardMessage?.message}
            size={'1.5'}
            isThemeColor
            family={'400'}
          />
        )}
        {/* <Text style={styles.orderDetails}>
          Qty: 1, SF018, Pink, LG, MJ Soffe, Sofe Cheerleading Short Pink, One
        </Text>
        <Text style={styles.orderDetails}>
          Stop, (Not Returnable)(Placed By: USTradeent)
        </Text> */}
        {/* <Text style={styles.orderDetails}>Q:Sep RETURN RCVD (Box No: 1)</Text> */}
        {(apiAllData?.BoardMessage?.issue_type == 'Order' ||
          apiAllData?.BoardMessage?.issue_type == 'Order Return') && (
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.barcodeButton}
              onPress={postBarCode}
            >
              <Text style={styles.buttonText}>Barcode</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 0.5,
                borderRadius: 5,
                paddingHorizontal: wp('1'),
              }}
              onPress={() => {
                onChangeVal('brCode', { id: 'PID' });
              }}
            >
              <Image
                source={brCode?.id == 'PID' ? radioFill : radioEmpty}
                resizeMode="contain"
                style={{
                  width: wp('3'),
                  height: hp('2.5'),
                  marginRight: wp('1'),
                }}
              />
              <Text style={styles.status}>PID</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 0.5,
                borderRadius: 5,
                paddingHorizontal: wp('1'),
              }}
              onPress={() => {
                onChangeVal('brCode', { id: 'UPC' });
              }}
            >
              <Image
                source={brCode?.id == 'UPC' ? radioFill : radioEmpty}
                resizeMode="contain"
                style={{
                  width: wp('3'),
                  height: hp('2.5'),
                  marginRight: wp('1'),
                }}
              />
              <Text style={styles.status}>UPC</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderMessage = ({ item }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.isSender ? styles.senderContainer : styles.receiverContainer,
        ]}
      >
        {/* Text Message */}
        <Text
          style={[
            styles.messageText,
            item.isSender ? styles.senderText : styles.receiverText,
          ]}
        >
          {item?.message}
        </Text>

        {/* Image Message */}
        {getUrlType(item.custom_field_1) == 'image' && (
          <Touchable
            style={styles.imageContainer}
            onPress={() => {
              Linking.openURL(item.custom_field_1);
            }}
          >
            <Image
              source={{ uri: item.custom_field_1 }}
              style={styles.chatImage}
              resizeMode="cover"
            />
          </Touchable>
        )}

        {/* PDF Message */}
        {getUrlType(item.custom_field_1) == 'pdf' && (
          <Touchable
            style={styles.pdfContainer}
            onPress={() => {
              Linking.openURL(item.custom_field_1);
            }}
          >
            <Text style={styles.pdfName}>📄 {'Pdf file'}</Text>
          </Touchable>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TextComponent
            text={`${item?.created_at} ${item?.name}`}
            size={1.8}
            styles={{ color: '#2ecc71' }}
          />
          <Touchable onPress={() => deleteChat('child', item?.id)}>
            <Image
              source={trashRed}
              resizeMode="contain"
              style={{ width: wp('5'), height: hp('3') }}
            />
          </Touchable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <OrderCard />

      {/* Chat List */}
      <FlatList
        data={ChildMessages}
        keyExtractor={item => item.id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatList}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton} onPress={handleFilePick}>
          <Image
            source={attachmentIcon}
            resizeMode="contain"
            style={{ width: wp('7'), height: hp('4') }}
          />
        </TouchableOpacity>

        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          style={styles.textInput}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleCameraPick}>
          <Image
            source={cameraGray}
            resizeMode="contain"
            style={{ width: wp('5'), height: hp('3') }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={postMeg}>
          <Image
            source={sendIcon}
            resizeMode="contain"
            style={{ width: wp('5'), height: hp('3') }}
          />
        </TouchableOpacity>
      </View>
      {modalState != null && (
        <BtnModalComponent
          activeTags={selectTag[modalState]}
          allData={arrySelector[modalState]}
          //   heading={onPressKey}
          // activeTitle={'select Diet'}
          isModal={Boolean(modalState != null)}
          onPress={() => setModalState(null)}
          onSelect={e => {
            onChangeVal(modalState, e);
            setModalState(null);
          }}
          onBackPress={() => setModalState(null)}
        />
      )}
    </View>
  );
};

export default ChatScreen;
