<script setup>

  import { useAccessStore } from '@/stores/userStore' 
  import { inject, onMounted } from 'vue';
  import { watch } from 'vue';
  import Room from './Room.vue';
  import Member from './Member.vue';
  import socket from "./../lib/socket";
import { ref } from 'vue';

  const store = useAccessStore()
  const memberName = ref('')

  const { 
    // socket,
    setMembers,
    members,
    setMessages,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom
  } = inject('chat-context')

  const viewMembers = ref(false)
  const joinRoom = (room, isPublic = true) => {
    

    if(isPublic){
      memberName.value = ''
    }

    if (!store.user) {
      return alert('Please Login')
    }
    
    socket.emit('join-room', room)
    setCurrentRoom(room)

    if(isPublic) {
      setPrivateMemberMsg(null)
    }

    store.resetNotifications(room)
    
  }

  socket.off('notifications').on('notifications',(room) => {
    /* if(currentRoom.value !== room) store.addNotifications(room) */
    store.addNotifications(room)
  })

  onMounted(() => {
    if(store.user) {
      setCurrentRoom('general')
      getRooms()
      socket.emit('join-room', 'general')
      socket.emit('new-user')
    }
  })

  socket.off('new-user').on('new-user', (payload) => {
    setMembers(payload)
  })

  const getRooms = async () => {
    const response = await fetch(
      'http://localhost:3001/chat/rooms',
      {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"}
      })
    const {rooms} = await response.json()
    setRooms(rooms)
  }

  const orderIds =  (id1, id2) => {
    if(id1 > id2) {
      return id1 + '-' + id2
    } else {
      return id2 + '-' + id1
    }
  }

  const handlePrivateMemberMsg = (member) => {
    setPrivateMemberMsg(member)
    memberName.value = member.name
    const roomId = orderIds(store.user._id, member._id)
    joinRoom(roomId, false)
    setCurrentRoom(roomId)
    if(viewMembers.value){
      viewMembers.value=false
    }else{
      viewMembers.value = true
    }
    // ! ////
  }

  const handleMembersView = ()=>{
    if(viewMembers.value){
      viewMembers.value=false
    }else{
      viewMembers.value = true
    }
  }


</script>

<template>
  
  
  <h2 @click="handleMembersView" class="titlemem">Members</h2>
  <div v-if="viewMembers" class="members">
    <Member
      v-for="member in members"
      :newMessages="store.user?.newMessages[orderIds(member._id,store.user._id)]" 
      @click="handlePrivateMemberMsg(member)"
      :member="member"
      :user="store.user"
      
    />
  </div>
  <div>

    <div class="title">Rooms</div>

    <div class="box">
      <Room
        v-for="room in rooms"
        :newMessages="store.user.newMessages[room]"
        :currentRoom="currentRoom"
        :room="room"
        @click="joinRoom(room)"
      />
    </div>

    <div  v-if=" memberName !== ''" class="name">
      <span >
        Chat con: {{ memberName }}
      </span>
    </div>

  </div>

</template>


<style scoped>

  .sidebar {
    background-color: gray;
    min-height: 100%;
  }
  .box{

  width: 350px;
  border-bottom: 8px solid var(--details);
  color: var(--title);
  height: 40px;
  background-color: var(--container);

  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;

  justify-content: center;
}

.name{
  background-color: var(--details);
  width: 100%;
  height: 25px;
  display: flex;
  text-align: center;
  justify-content: center;
  color: var(--container);
}
.title{
  height: 30px;
  color: var(--title);
  align-items: center;
  text-align: center;
  background-color: var(--container);

  border-radius: 10px 10px 0px 0px;
}

.titlemem{
  display: flex;
  justify-content: center;
  cursor: pointer;
  height: 30px;

  color: var(--title);
  align-items: center;
  text-align: center;
  background-color: var(--container);
  border-radius: 10px;
  border: 2px solid var(--border);

}

.titlemem:hover{
  font-size: 18px;
}

.members{
  height: 600px;
  color: var(--title);
  width: 350px;
  position: absolute;
  z-index: 10;
  border: 2px solid var(--border);
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: var(--container);
  overflow-y: scroll;

}

</style>