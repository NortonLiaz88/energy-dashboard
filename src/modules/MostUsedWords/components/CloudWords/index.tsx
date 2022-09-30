/* eslint-disable camelcase */
import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5wc from '@amcharts/amcharts5/wc';

import { CloudDiv, containerStyle, wordCloudStyle } from './styles';
import theme from '../../../../styles/theme';
import { MappedWordSerie } from '../../../../models/MostUsedWords';
import { useMostUsedWords } from '../../hooks/useMostUsedWords';

interface Props {
  inModal: boolean;
}

export const CloudWords: React.FC<Props> = ({ inModal }) => {
  const { wordsSeries } = useMostUsedWords();

  useLayoutEffect(() => {
    const root = am5.Root.new(inModal ? 'chartclouddivmodal' : 'chartclouddiv');

    const container = root.container.children.push(
      am5.Container.new(root, {
        ...containerStyle,
        layout: root.verticalLayout,
      }),
    );

    const wordCloud = am5wc.WordCloud.new(root, {
      colors: am5.ColorSet.new(root, {
        colors: [
          am5.color(theme.colors.link),
          am5.color(theme.colors.subtitle),
          am5.color(theme.colors.endGradientColor),
          am5.color(theme.colors.seeMoreBox),
        ],
      }),
      ...wordCloudStyle,
    });
    wordCloud.setPrivate('adjustedFontSize', 3);

    const series = container.children.push(wordCloud);
    series.labels.template.setAll({
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      paddingRight: 5,
    });

    series.data.setAll(
      wordsSeries
        .map(
          ({ weight, word }) =>
            ({
              category: word.toUpperCase(),
              value: weight,
            } as MappedWordSerie),
        )
        .slice(0, 50),
    );

    return () => root.dispose();
  }, [inModal, wordsSeries]);

  return <CloudDiv id={inModal ? 'chartclouddivmodal' : 'chartclouddiv'} />;
};
