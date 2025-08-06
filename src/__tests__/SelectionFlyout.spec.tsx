import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, userEvent } from '../test/test-utils';
import SelectionFlyout from '../components/SelectionFlyout.component';
import { mockBulbasaur, mockIvysaur } from '../test/handlers';
import type { DisplayPokemon } from '../types';

describe('SelectionFlyout component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not render when no items are selected', () => {
    const { container } = render(<SelectionFlyout />, {
      preloadedState: {
        selection: { selectedPokemons: [] },
      },
    });
    expect(container).toBeEmptyDOMElement();
  });

  it('renders with correct count for one selected item', () => {
    render(<SelectionFlyout />, {
      preloadedState: {
        selection: { selectedPokemons: [mockBulbasaur] },
      },
    });
    expect(screen.getByText('1 item selected')).toBeInTheDocument();
  });

  it('renders with correct count for multiple selected items', () => {
    render(<SelectionFlyout />, {
      preloadedState: {
        selection: { selectedPokemons: [mockBulbasaur, mockIvysaur] },
      },
    });
    expect(screen.getByText('2 items selected')).toBeInTheDocument();
  });

  it('dispatches clearSelection action when "Unselect all" is clicked', async () => {
    const { store } = render(<SelectionFlyout />, {
      preloadedState: {
        selection: { selectedPokemons: [mockBulbasaur] },
      },
    });

    const unselectAllButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    await userEvent.click(unselectAllButton);

    expect(store.getState().selection.selectedPokemons).toHaveLength(0);
  });

  it('triggers download with correct CSV data when "Download" is clicked', async () => {
    const selectedPokemons: DisplayPokemon[] = [mockBulbasaur, mockIvysaur];

    render(<SelectionFlyout />, {
      preloadedState: {
        selection: { selectedPokemons },
      },
    });

    window.URL.createObjectURL = vi.fn(() => 'mock_url');
    (window as any).Blob = vi.fn();
    const linkMock = {
      click: vi.fn(),
      setAttribute: vi.fn(),
    };
    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockReturnValue(linkMock as any);
    const appendChildSpy = vi
      .spyOn(document.body, 'appendChild')
      .mockImplementation((node) => node);
    const removeChildSpy = vi
      .spyOn(document.body, 'removeChild')
      .mockImplementation((node) => node);

    const downloadButton = screen.getByRole('button', { name: /download/i });
    await userEvent.click(downloadButton);

    const expectedCsvHeaders = 'id,name,description,imageUrl';
    const expectedCsvRow1 = `${mockBulbasaur.id},"${mockBulbasaur.name}","${mockBulbasaur.description}","${mockBulbasaur.imageUrl}"`;
    const expectedCsvRow2 = `${mockIvysaur.id},"${mockIvysaur.name}","${mockIvysaur.description.replace(/"/g, '""')}","${mockIvysaur.imageUrl}"`;
    const expectedCsvContent = `${expectedCsvHeaders}\n${expectedCsvRow1}\n${expectedCsvRow2}`;

    expect(window.Blob).toHaveBeenCalledWith([expectedCsvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(linkMock.setAttribute).toHaveBeenCalledWith('href', 'mock_url');
    expect(linkMock.setAttribute).toHaveBeenCalledWith(
      'download',
      '2_pokemons.csv'
    );
    expect(linkMock.click).toHaveBeenCalledTimes(1);
    expect(appendChildSpy).toHaveBeenCalledWith(linkMock);
    expect(removeChildSpy).toHaveBeenCalledWith(linkMock);
  });
});
