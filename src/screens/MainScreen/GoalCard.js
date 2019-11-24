import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {elevationShadowStyle} from '../../common/StylesHelper';
import {useComponentSize} from '../../common/hooks/useComponentSize';
import {useMemo} from 'react';
import ColorPalette from '../../common/ColorPalette';

function GoalCard({goalName, subtitle, value, maxValue}) {
  const [size, onLayout] = useComponentSize();
  const barWidth = useMemo(() => (size ? size.width - 24 : 0), [size]);
  const actualWidth = useMemo(() => (barWidth * value) / maxValue, [
    barWidth,
    value,
    maxValue,
  ]);

  return (
    <View style={styles.root} onLayout={onLayout}>
      <Text style={styles.nameLabel}>{goalName}</Text>
      <View style={[styles.emptyProgress, {width: barWidth}]}>
        <View style={[styles.fullProgress, {width: actualWidth}]} />
      </View>
      <Text style={styles.valueLabel}>
        {value} / {maxValue}
      </Text>
      <Text style={styles.subtitleLabel}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    ...elevationShadowStyle(2),
    height: 115,
    paddingHorizontal: 12,
    justifyContent: 'center',
    marginBottom: 10,
  },
  nameLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  emptyProgress: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    height: 16,
    ...elevationShadowStyle(1),
  },
  fullProgress: {
    backgroundColor: ColorPalette.PRIMARY,
    borderRadius: 8,
    height: 16,
  },
  valueLabel: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 4,
  },
  subtitleLabel: {
    fontSize: 16,
    alignSelf: 'center',
  },
});

export default React.memo(GoalCard);
