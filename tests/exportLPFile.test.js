/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/


import { describe, it, expect, vi } from 'vitest';
import { exportLPFile } from '../src/businesslogic/exportLPFile'; 
import { generateLPFile } from '../src/businesslogic/inputToLPInterface'; 

// Mock generateLPFile function since it is an external dependency
vi.mock('../src/businesslogic/inputToLPInterface', () => ({
  generateLPFile: vi.fn(),
}));

describe('exportLPFile', () => {
  // Mock elements and functions related to DOM and URL creation
  const mockCreateElement = vi.spyOn(document, 'createElement');
  const mockCreateObjectURL = vi.spyOn(window.URL, 'createObjectURL');

  let mockLink;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Mock <a> element creation
    mockLink = {
      click: vi.fn(),
      href: '',
      download: '',
    };
    mockCreateElement.mockReturnValue(mockLink);

    // Mock URL.createObjectURL
    mockCreateObjectURL.mockReturnValue('blob-url');
  });

  it('should generate and download a .lp file', () => {
    // Mock the content of the LP file generated
    const mockLPContent = 'mock lp file content';
    generateLPFile.mockReturnValue(mockLPContent);

    // Mock optimization store
    const mockOptimizationStore = {
      selectedOptimization: 'mock-optimization',
      getObjectiveFunction: 'mock-objective-function',
      constraints: ['constraint1', 'constraint2'],
      getProblemBounds: 'mock-bounds',
    };

    // Call the function to test
    exportLPFile('lp', mockOptimizationStore);

    // Check if generateLPFile was called with the correct arguments
    expect(generateLPFile).toHaveBeenCalledWith(
      'mock-optimization',
      'mock-objective-function',
      ['constraint1', 'constraint2'],
      'mock-bounds',
      ''
    );

    // Check if the Blob was created with correct content
    expect(mockCreateObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    
    // Verify the content inside the Blob
    const blobArg = mockCreateObjectURL.mock.calls[0][0];
    expect(blobArg instanceof Blob).toBe(true);
    expect(blobArg.size).toBe(mockLPContent.length); // Check blob size matches content length
    expect(blobArg.type).toBe('text/plain');

    // Check if the link attributes are correctly set
    expect(mockLink.href).toBe('blob-url');
    expect(mockLink.download).toBe('problem.lp');

    // Ensure the link was clicked to trigger the download
    expect(mockLink.click).toHaveBeenCalled();
  });

  it('should generate and download a .txt file', () => {
    // Mock the content of the LP file generated
    const mockLPContent = 'mock lp file content for txt';
    generateLPFile.mockReturnValue(mockLPContent);

    // Mock optimization store
    const mockOptimizationStore = {
      selectedOptimization: 'txt-optimization',
      getObjectiveFunction: 'txt-objective-function',
      constraints: ['constraint-txt'],
      getProblemBounds: 'txt-bounds',
    };

    // Call the function to test
    exportLPFile('txt', mockOptimizationStore);

    // Check if generateLPFile was called with the correct arguments
    expect(generateLPFile).toHaveBeenCalledWith(
      'txt-optimization',
      'txt-objective-function',
      ['constraint-txt'],
      'txt-bounds',
      ''
    );

    // Check if the Blob was created with correct content
    expect(mockCreateObjectURL).toHaveBeenCalledWith(expect.any(Blob));

    // Verify the content inside the Blob
    const blobArg = mockCreateObjectURL.mock.calls[0][0];
    expect(blobArg instanceof Blob).toBe(true);
    expect(blobArg.size).toBe(mockLPContent.length);
    expect(blobArg.type).toBe('text/plain');

    // Check if the link attributes are correctly set
    expect(mockLink.href).toBe('blob-url');
    expect(mockLink.download).toBe('problem.txt');

    // Ensure the link was clicked to trigger the download
    expect(mockLink.click).toHaveBeenCalled();
  });
});
