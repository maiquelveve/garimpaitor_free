import { useEffect, useState } from 'react';
import { useKeyboard } from '@react-native-community/hooks';
import { Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Modalize } from 'react-native-modalize';

import ListEmptyComponent from '../ListEmptyComponent';
import Header from './Header';

const { height } = Dimensions.get('window');

export const SelectBox = ({
  modalizeRef,
  listItem,
  RenderItemComponent,
  handleChangeValue,
  valueCurrent,
  snapPoint = height / 2,
  modalHeight = height / 1.2,
  initialNumToRender = 10,
  withHandleModal = true,
  msgListEmpty = 'Nenhum Item encontrado!',
  isSubMsgListEmpty = false,
  subMsgListEmpty = 'Não foi possivel encontrar nenhum Item.',
  handleClosedModal = () => { },
}) => {

  const Keyboard = useKeyboard();
  const [listState, setListState] = useState([]);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setListState(listItem);
  }, []);

  useEffect(() => {
    if (listState.length > 0 && firstRender)
      setFirstRender(false);
  }, [listState]);

  const handleFindFilter = (filter) => {
    if (filter === '') {
      setListState(listItem);
    } else {
      const listCurrent = listItem.filter(el => el.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
      setListState(listCurrent);
    }
  }

  return (
    <>
      <Modalize
        ref={modalizeRef}
        handlePosition='inside'
        HeaderComponent={<Header handleFindItem={handleFindFilter} />}
        snapPoint={snapPoint}
        modalHeight={modalHeight}
        withHandle={withHandleModal}
        flatListProps={{
          data: firstRender ? listItem : listState,
          renderItem: ({ item }) => (
            <KeyboardAvoidingView behavior='height'>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <RenderItemComponent
                  item={item}
                  valueCurrent={valueCurrent}
                  handleChangeValue={handleChangeValue}
                  handleClosed={handleClosedModal}
                />
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          ),
          keyExtractor: item => item.id,
          showsVerticalScrollIndicator: false,
          initialNumToRender: initialNumToRender,
          ListEmptyComponent: () => (
            <ListEmptyComponent msg={msgListEmpty} isSubMsg={isSubMsgListEmpty} subMsg={subMsgListEmpty} />
          )
        }}
      />
    </>
  );
}
