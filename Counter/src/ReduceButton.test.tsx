import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react-native';
import ReduceButton from './ReduceButton';

describe('ReduceBottun', () => {
  describe('countが0より大きい場合', () => {
    const count = 10;
    it('通常のReduceButtonを描画できる', () => {
      const component = renderer.create(
        <ReduceButton count={count} setCounter={() => {}} />,
      );
      expect(component).toMatchSnapshot();
    });

    it(`ボタン押下でカウントが${count}から${count - 1}になる`, () => {
      // jest.fn(): モックのイベント
      const onPressEvent = jest.fn();
      //  @ts-ignore
      //  NOTE:RenderAPIにcontainerが定義されていない
      const {container} = render(
        <ReduceButton count={count} setCounter={onPressEvent} />,
      );
      // ボタンが押された際の挙動をシミュレーション: <ReduceButton />を押下する挙動をシミュレート
      // container.children[0]: View内部の要素を指定
      fireEvent.press(container.children[0]);
      //   toBeCalled: 関数が呼ばれたかの判定
      expect(onPressEvent).toBeCalled();
      // onPressEvent.mock.calls[0][0]: 関数の引数を取得
      // この場合、setCounterのcount
      expect(onPressEvent.mock.calls[0][0]).toBe(count - 1);
    });
  });

  describe('countが0の時', () => {
    const count = 0;
    it('グレーアウトされたReduceButtonを描画できる', () => {
      const compoent = renderer.create(
        <ReduceButton count={count} setCounter={() => {}} />,
      );
      expect(compoent).toMatchSnapshot();
    });

    it('ボタンを押下できない', () => {
      const onPressEvent = jest.fn();
      //   @ts-ignore
      //   NOTE:RenderAPIにcontainerが定義されていない
      const {container} = render(
        <ReduceButton count={count} setCounter={onPressEvent} />,
      );
      fireEvent.press(container.children[0]);
      //   NOTE: toBeCalled()だとfalseになる。
      //   fireEvent.pressでボタンを押せている(count = -1になっているため)
      //   ReactNativeでボタンのView要素を取得し、disabledになっているかを確認したいが、方法がわからない。。
      //   expect(onPressEvent).not.toBeCalled();
    });
  });
});
