/**
 * Creates a formatted output from a given file document
 * @param {Object} document - Document from the files collection
 * @param {ObjectId} document._id - The file's ID
 * @param {ObjectId} document.userId - The ID of the user who owns the file
 * @param {string} document.name - The name of the file
 * @param {string} document.type - The type of the file
 * @param {boolean} document.isPublic - Whether the file is public
 * @param {string|ObjectId} document.parentId - The ID of the parent folder
 * @returns {Object} Formatted file document
 */
export default function formatFileDocument(document) {
  const {
    _id, userId, name, type, isPublic, parentId,
  } = document;

  return {
    id: _id.toString(),
    userId: userId.toString(),
    name,
    type,
    isPublic,
    parentId: parentId === ROOT_FOLDER_ID ? 0 : parentId.toString(),
  };
}
