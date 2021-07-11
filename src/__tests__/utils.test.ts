import collectionToObject from '../utils/collectionToObject';

const collection = [
  {
    Country: 'Barbados',
    Slug: 'barbados',
    ISO2: 'BB',
  },
  {
    Country: 'Gibraltar',
    Slug: 'gibraltar',
    ISO2: 'GI',
  },
  {
    Country: 'Lithuania',
    Slug: 'lithuania',
    ISO2: 'LT',
  },
];

it('transform collection to object with selected key', async () => {
  expect(collectionToObject(collection, 'Slug')).toEqual({
    barbados: {
      Country: 'Barbados',
      ISO2: 'BB',
    },
    gibraltar: {
      Country: 'Gibraltar',
      ISO2: 'GI',
    },
    lithuania: {
      Country: 'Lithuania',
      ISO2: 'LT',
    },
  });
});
