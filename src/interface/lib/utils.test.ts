import { cn } from './utils';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

jest.mock('clsx', () => ({
  clsx: jest.fn(),
}));

jest.mock('tailwind-merge', () => ({
  twMerge: jest.fn(),
}));

describe('cn function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should import clsx and twMerge correctly', () => {
    expect(clsx).toBeDefined();
    expect(twMerge).toBeDefined();
  });

  it('should merge simple class names', () => {
    cn('class1', 'class2');
    expect(clsx).toHaveBeenCalledWith(['class1', 'class2']);
  });

  it('should merge conditional class names', () => {
    cn('class1', { class2: true, class3: false });
    expect(clsx).toHaveBeenCalledWith([
      'class1',
      {
        class2: true,
        class3: false,
      },
    ]);
  });
});
