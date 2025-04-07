"use client";

import { useState } from 'react';
import { FiSearch, FiTrash2, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import Modal, { ModalType } from '../(components)/modal';
import { deleteAccount } from '@/actions/accounts';
import { setAdmin } from '@/actions/accounts';
import { removeAdmin } from '@/actions/accounts';
import { logoutAction } from '@/actions/auth';
import { useProfile } from '@/providers/profileContext';

interface User {
  id: string;
  email: string;
  created_at: Date;
  type: 'user' | 'admin';
}

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  title: string;
  message: string | string[];
  targetId: string;
  action: 'delete' | 'toggle' | null;
}

export default function Accounts({ accountList, currentUserEmail = '' }: { accountList: User[], currentUserEmail?: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>(accountList || []);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: 'confirmation',
    title: '',
    message: '',
    targetId: '',
    action: null
  });
  const { profile } = useProfile();

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler for initiating admin toggle
  const handleToggleAdmin = (user: User) => {
    const isSelf = user.email === currentUserEmail;
    const newType = user.type === 'admin' ? 'user' : 'admin';
    
    setModalState({
      isOpen: true,
      type: 'confirmation',
      title: isSelf ? 'Warning: Changing Your Own Permissions' : `Change User Permissions`,
      message: isSelf 
        ? [`You are about to ${newType === 'admin' ? 'grant yourself' : 'remove your own'} admin privileges.`, 
           `This may affect your ability to manage this system.`,
           `Are you sure you want to continue?`]
        : `Are you sure you want to ${newType === 'admin' ? 'grant admin privileges to' : 'remove admin privileges from'} ${user.email}?`,
      targetId: user.id,
      action: 'toggle'
    });
  };

  // Handler for initiating user deletion
  const handleDeleteUser = (user: User) => {
    const isSelf = user.email === currentUserEmail;
    
    setModalState({
      isOpen: true,
      type: 'confirmation',
      title: isSelf ? 'Warning: Deleting Your Own Account' : 'Confirm Deletion',
      message: isSelf 
        ? [`You are about to delete your own account.`, 
           `This action cannot be undone.`,
           `You will be logged out immediately.`]
        : `Are you sure you want to delete the account for ${user.email}? This action cannot be undone.`,
      targetId: user.id,
      action: 'delete'
    });
  };

  // Handler for confirming modal action
  const handleConfirm = async () => {
    try {
      if (modalState.action === 'delete') {
        const targetUser = users.find(user => user.id === modalState.targetId);
        const isSelf = targetUser?.email === currentUserEmail;
        
        // Call the server action to delete the account
        await deleteAccount(modalState.targetId);
        
        // Update local state
        setUsers(users.filter(user => user.id !== modalState.targetId));
        
        // If deleting own account, log out
        if (isSelf) {
          await logoutAction();
          window.location.href = '/login'; // Redirect to login page
          return; // Early return to prevent showing the success modal
        }
        
        // Success modal after deletion
        setModalState({
          isOpen: true,
          type: 'success',
          title: 'Account Deleted',
          message: `The account has been successfully deleted.`,
          targetId: '',
          action: null
        });
      } else if (modalState.action === 'toggle') {
        const targetUser = users.find(user => user.id === modalState.targetId);
        const newType = targetUser?.type === 'admin' ? 'user' : 'admin';
        
        // Call the appropriate server action based on the new type
        if (newType === 'admin') {
          await setAdmin(modalState.targetId);
        } else {
          await removeAdmin(modalState.targetId);
        }
        
        // Update local state
        setUsers(users.map(user =>
          user.id === modalState.targetId ? { 
            ...user, 
            type: user.type === 'admin' ? 'user' : 'admin' 
          } : user
        ));
        
        // Success modal after toggle
        setModalState({
          isOpen: true,
          type: 'success',
          title: 'Permissions Updated',
          message: `User permissions have been updated to ${newType}.`,
          targetId: '',
          action: null
        });
        
        // If the user changed their own permissions, refresh the profile context
        if (targetUser?.email === currentUserEmail) {
          window.location.reload(); // Refresh to update UI based on new permissions
        }
      } else {
        // Close success or error modals
        handleCancel();
      }
    } catch (error) {
      // Error modal if any action fails
      setModalState({
        isOpen: true,
        type: 'error',
        title: 'Operation Failed',
        message: `There was an error processing your request: ${error instanceof Error ? error.message : 'Unknown error'}`,
        targetId: '',
        action: null
      });
    }
  };

  // Handler for canceling modal
  const handleCancel = () => {
    setModalState({
      ...modalState,
      isOpen: false
    });
  };

  return (
    <>
      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search users..."
          className="pl-10 pr-4 py-3 w-full max-w-md border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F36]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                const isSelf = user.email === currentUserEmail;
                return (
                  <tr key={user.id} className={`hover:bg-gray-50 ${isSelf ? 'bg-blue-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {isSelf ? <strong>{user.email} (You)</strong> : user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleAdmin(user)}
                        className="cursor-pointer text-gray-700 hover:text-[#292F36]"
                        aria-label={user.type === 'admin' ? 'Revoke admin' : 'Make admin'}
                      >
                        {user.type === 'admin' ? (
                          <FiToggleRight className="h-5 w-5 text-green-500" />
                        ) : (
                          <FiToggleLeft className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="cursor-pointer text-red-500 hover:text-red-700"
                        aria-label="Delete user"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={modalState.isOpen}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}