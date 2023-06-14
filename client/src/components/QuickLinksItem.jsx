import React from "react";
import { Box } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const QuickLinksItem = ({ quickLink, handleCopyLink, handleEditLink, handleDeleteLink }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '33%' }}>
      <Box sx={{ flex: 1, marginLeft: '2%' }}>
        <span>{quickLink.name}</span>
      </Box>
      <Box sx={{ flex: 2 }}>
        <input type="text" value={quickLink.url} readOnly style={{ width: '160%', borderRadius: '5px' }} />
      </Box>
      <Box sx={{
        flex: 2,
        marginLeft: '10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
        <FileCopyIcon
          sx={{ color: 'rgba(62, 144, 193, 0.8)', cursor: 'pointer', marginLeft: '5%' }}
          onClick={() => handleCopyLink(quickLink.url)}
        />
        <EditIcon
          sx={{ color: 'rgba(184, 134, 11)', cursor: 'pointer', marginLeft: '5%' }}
          onClick={() => handleEditLink(quickLink)}
        />
        <DeleteIcon
          sx={{  color: 'rgba(210, 77, 87)', cursor: 'pointer', marginLeft: '5%', marginRight: '5%' }}
          onClick={() => handleDeleteLink(quickLink.id)}
        />
      </Box>
    </Box>
  )
}

export default QuickLinksItem;