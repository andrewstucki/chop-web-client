// @flow
import reducer,
{
  closeMenu, 
  openMenu,
} from '../../src/sideMenu/dux';

describe('SideMenu tests', () => {
  test('default state', () => {
    const results = reducer();
    expect(results).toEqual(
      {
        closed: true,
      }
    );
  });

  test('close', () => {
    const results = reducer(
      {
        closed: false,
      },
      closeMenu()
    );
    expect(results).toEqual(
      {
        closed: true,
      }
    );
  });

  test('close when closed', () => {
    const results = reducer(
      {
        closed: true,
      },
      closeMenu()
    );
    expect(results).toEqual(
      {
        closed: true,
      }
    );
  });

  test('open', () => {
    const results = reducer(
      {
        closed: true,
      },
      openMenu()
    );
    expect(results).toEqual(
      {
        closed: false,
      }
    );
  });
});