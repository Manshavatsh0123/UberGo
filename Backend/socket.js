const socketIo = require('socket.io');
const mongoose = require('mongoose');
const userModel = require('./models/user.model');
const captionModel = require('./models/caption.model');
const rideModel = require('./models/ride.model');


let io;
const userSocketMap = {};

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // JOIN SOCKET
        socket.on('join', async ({ userId, userType }) => {
            try {
                if (userType === 'user') {
                    const user = await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                    console.log(`✅ User ${userId} joined with socket ${socket.id}`);
                    if (!user) {
                        return socket.emit('error', { message: 'User not found' });
                    }
                    userSocketMap[userId] = socket.id;
                    console.log(`User ${userId} joined with socket ${socket.id}`);
                    socket.emit('join-success', { message: 'User joined successfully' });

                } else if (userType === 'captain') {
                    const captain = await captionModel.findByIdAndUpdate(userId, { socketId: socket.id });
                    console.log(`✅ Captain ${userId} joined with socket ${socket.id}`);
                    if (!captain) {
                        return socket.emit('error', { message: 'Captain not found' });
                    }
                    userSocketMap[userId] = socket.id;
                    console.log(`Captain ${userId} joined with socket ${socket.id}`);
                    socket.emit('join-success', { message: 'Captain joined successfully' });

                } else {
                    console.warn('Invalid userType:', userType);
                    socket.emit('error', { message: 'Invalid userType' });
                }
            } catch (error) {
                console.error('Join error:', error.message);
                socket.emit('error', { message: `Join failed: ${error.message}` });
            }
        });

        // UPDATE CAPTAIN LOCATION
        socket.on('update-location-captain', async ({ userId, location }) => {
            try {
                if (!location?.lat || !location?.lng) {
                    return socket.emit('error', { message: 'Invalid location data' });
                }

                const captain = await captionModel.findById(userId);
                if (!captain) return socket.emit('error', { message: 'Captain not found' });

                captain.status = 'active';
                captain.location = {
                    lat: location.lat,
                    lng: location.lng
                };

                await captain.save();
                console.log(`Updated location for captain ${userId}`);
            } catch (error) {
                console.error('Location update error:', error.message);
                socket.emit('error', { message: `Location update failed: ${error.message}` });
            }
        });

        // SEND RIDE REQUEST TO CAPTAIN
        socket.on('new-ride-request', async (rideData) => {
            try {
                const { captainSocketId } = rideData;

                if (!captainSocketId) {
                    return socket.emit('error', { message: 'captainSocketId is missing' });
                }

                const captain = await captionModel.findOne({ socketId: captainSocketId });
                if (captain) {
                    io.to(captain.socketId).emit('new-ride', rideData);
                    console.log(`Ride request sent to captain ${captain._id}`);
                } else {
                    console.warn('Captain not found for ride request.');
                    socket.emit('error', { message: 'Captain not found for the ride request' });
                }
            } catch (error) {
                console.error('Error sending ride request:', error.message);
                socket.emit('error', { message: `Error sending ride request: ${error.message}` });
            }
        });


        socket.on('confirm-ride', async ({ rideId }) => {
            try {
                const ride = await rideModel.findById(rideId)
                    .populate({ path: 'user', select: 'socketId _id fullname email' })
                    .populate({ path: 'captain', select: 'socketId _id fullname email' });
        
                if (!ride) {
                    console.warn(`❌ Ride not found with ID: ${rideId}`);
                    return socket.emit('custom-error', { message: 'Ride not found' });
                }
        
                // Emit to User
                const userSocketId = ride.user?.socketId;
                
                if (userSocketId) {
                    console.log(`✅ Sent ride-confirmed to user ${ride.user._id} on socket ${userSocketId}`); // Add this line for debugging
                    
                    io.to(userSocketId).emit('ride-confirmed', {
                        event: 'ride-confirmed',
                        data: {
                            rideId: ride._id,
                            userId: ride.user._id,
                            captainId: ride.captain._id,
                            ...ride.toObject()
                        }
                    });
                } else {
                    console.warn('❌ User socket ID missing for ride confirmation');
                }
        
                // Optional: Emit to Captain (confirmation acknowledgment)
                const captainSocketId = ride.captain?.socketId;
                if (captainSocketId) {
                    io.to(captainSocketId).emit('ride-confirmed', {
                        event: 'ride-confirmed',
                        data: {
                            rideId: ride._id,
                            userId: ride.user._id,
                            captainId: ride.captain._id,
                            ...ride.toObject()
                        }
                    });
                    console.log(`✅ Sent ride-confirmed to captain ${ride.captain._id} on socket ${captainSocketId}`);
                }
        
            } catch (error) {
                console.error('❌ Error confirming ride:', error.message);
                socket.emit('custom-error', { message: `Confirm ride failed: ${error.message}` });
            }
        });
        


        // HANDLE DISCONNECT
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
            for (const userId in userSocketMap) {
                if (userSocketMap[userId] === socket.id) {
                    delete userSocketMap[userId];
                    console.log(`Removed ${userId} from socket map`);
                    // Optionally, remove socketId from the database on disconnect
                    // Example for removing socketId from a user:
                    // await userModel.findByIdAndUpdate(userId, { socketId: null });
                    break;
                }
            }
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
    console.log('Attempting to send message to socket:', socketId);
    console.log('Message Object:', messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
        console.log('Message sent to socket:', socketId);
    } else {
        console.warn('Socket.io not initialized.');
    }
};


module.exports = { initializeSocket, sendMessageToSocketId };
