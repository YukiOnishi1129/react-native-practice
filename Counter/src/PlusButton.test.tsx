import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react-native';
import PlusButton from './PlusButton';

describe('PlusButton', () => {
  const count = 10;
  it('通常のPlusButtonを描画できる', () => {
    const component = renderer.create(
      <PlusButton count={count} setCounter={() => {}} />,
    );
    expect(component).toMatchSnapshot();
  });

  it(`ボタン押下でカウントが${count}から${count + 1}になる`, () => {
    // jest.fn(): モックのイベント
    const onPressEvent = jest.fn();
    //  @ts-ignore
    //  NOTE:RenderAPIにcontainerが定義されていない
    const {container} = render(
      <PlusButton count={count} setCounter={onPressEvent} />,
    );
    // ボタンが押された際の挙動をシミュレーション: <PlusButton />を押下する挙動をシミュレート
    // container.children[0]: View内部の要素を指定
    fireEvent.press(container.children[0]);
    //   toBeCalled: 関数が呼ばれたかの判定
    expect(onPressEvent).toBeCalled();
    // onPressEvent.mock.calls[0][0]: 関数の引数を取得
    // この場合、setCounterのcount
    expect(onPressEvent.mock.calls[0][0]).toBe(count + 1);
  });
});
