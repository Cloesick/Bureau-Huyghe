import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { server } from '../../mocks/server';
import DocumentManager from '../DocumentManager';
import { AuthProvider } from '../../contexts/AuthContext';

const mockUser = {
  id: 'user-123',
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Doe'
};

const renderDocumentManager = () => {
  return render(
    <BrowserRouter>
      <AuthProvider initialUser={mockUser}>
        <DocumentManager />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('DocumentManager', () => {
  test('renders document list and upload section', async () => {
    renderDocumentManager();

    // Check for main sections
    expect(screen.getByText(/documenten/i)).toBeInTheDocument();
    expect(screen.getByText(/document uploaden/i)).toBeInTheDocument();

    // Wait for documents to load
    await waitFor(() => {
      expect(screen.getByText('Contract - Land Survey')).toBeInTheDocument();
      expect(screen.getByText('Property Survey Report')).toBeInTheDocument();
    });
  });

  test('successfully uploads a document', async () => {
    renderDocumentManager();

    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/bestand kiezen/i);

    // Mock file selection
    Object.defineProperty(fileInput, 'files', {
      value: [file]
    });
    fireEvent.change(fileInput);

    // Fill in document details
    fireEvent.change(screen.getByLabelText(/titel/i), {
      target: { value: 'Test Document' }
    });
    fireEvent.change(screen.getByLabelText(/beschrijving/i), {
      target: { value: 'Test Description' }
    });

    // Submit form
    fireEvent.click(screen.getByText(/uploaden/i));

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/document succesvol geüpload/i)).toBeInTheDocument();
    });
  });

  test('shows error message when upload fails', async () => {
    // Mock upload failure
    server.use(
      rest.post('http://localhost:3001/api/documents/upload', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: 'Upload failed' })
        );
      })
    );

    renderDocumentManager();

    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/bestand kiezen/i);

    // Mock file selection
    Object.defineProperty(fileInput, 'files', {
      value: [file]
    });
    fireEvent.change(fileInput);

    // Submit form
    fireEvent.click(screen.getByText(/uploaden/i));

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/upload mislukt/i)).toBeInTheDocument();
    });
  });

  test('successfully deletes a document', async () => {
    renderDocumentManager();

    // Wait for documents to load
    await waitFor(() => {
      expect(screen.getByText('Contract - Land Survey')).toBeInTheDocument();
    });

    // Click delete button on first document
    const deleteButton = screen.getAllByLabelText(/document verwijderen/i)[0];
    fireEvent.click(deleteButton);

    // Confirm deletion
    fireEvent.click(screen.getByText(/bevestigen/i));

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/document succesvol verwijderd/i)).toBeInTheDocument();
    });
  });

  test('filters documents by type', async () => {
    renderDocumentManager();

    // Wait for documents to load
    await waitFor(() => {
      expect(screen.getByText('Contract - Land Survey')).toBeInTheDocument();
    });

    // Select contract filter
    fireEvent.click(screen.getByLabelText(/filter op type/i));
    fireEvent.click(screen.getByText(/contract/i));

    // Check that only contracts are shown
    await waitFor(() => {
      expect(screen.getByText('Contract - Land Survey')).toBeInTheDocument();
      expect(screen.queryByText('Property Survey Report')).not.toBeInTheDocument();
    });
  });

  test('shows document preview', async () => {
    renderDocumentManager();

    // Wait for documents to load
    await waitFor(() => {
      expect(screen.getByText('Contract - Land Survey')).toBeInTheDocument();
    });

    // Click preview button
    const previewButton = screen.getAllByLabelText(/document bekijken/i)[0];
    fireEvent.click(previewButton);

    // Check that preview modal is shown
    await waitFor(() => {
      expect(screen.getByText(/document preview/i)).toBeInTheDocument();
      expect(screen.getByText('Contract - Land Survey')).toBeInTheDocument();
    });
  });
});
