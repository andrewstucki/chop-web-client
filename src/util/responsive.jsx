import React from 'react';
import Responsive from 'react-responsive';

const Small = React.memo(props => <Responsive {...props} maxWidth={639} />);
Small.displayName = 'Small';

const Medium = React.memo(props => <Responsive {...props} minidth={640} maxWidth={767} />);
Medium.displayName = 'Medium';

const MediumUp = React.memo(props => <Responsive {...props} minWidth={640} />);
MediumUp.displayName = 'MediumUp';

const MediumPlus = React.memo(props => <Responsive {...props} minWidth={768} maxWidth={1023} />);
MediumPlus.displayName = 'MediumPlus';

const MediumPlusUp = React.memo(props => <Responsive {...props} minWidth={768} />);
MediumPlusUp.displayName = 'MediumPlusUp';

const Large = React.memo(props => <Responsive {...props} minWidth={1024} maxWidth={1199} />);
Large.displayName = 'Large';

const LargeUp = React.memo(props => <Responsive {...props} minWidth={1024} />);
LargeUp.displayName = 'LargeUp';

const Xlarge = React.memo(props => <Responsive {...props} minWidth={1200} />);
Xlarge.displayName = 'Xlarge';

export {
  Small,
  Medium,
  MediumUp,
  MediumPlus,
  MediumPlusUp,
  Large,
  LargeUp,
  Xlarge,
};
