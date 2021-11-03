import { ref } from 'vue'

export default function useFixed () {
  const groupRef = ref(null)
  const fixedTitle = ref('')

  return { groupRef, fixedTitle }
}
