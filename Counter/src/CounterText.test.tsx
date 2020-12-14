import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CounterText from './CounterText';

describe('CounterText', () => {
  it('通常のCounterTextを描画する', () => {
    const component = renderer.create(<CounterText count={0} />);
    // toMatchSnapshot: JSXのスナップショットを書き出す
    expect(component).toMatchSnapshot();
  });
  it('カウントが10以上の時のテキストが表示されているCounterTextを描画できる', () => {
    const component = renderer.create(<CounterText count={10} />);
    expect(component).toMatchSnapshot();
  });
});
