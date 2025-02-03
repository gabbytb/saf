import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'



const DashboardUsersMenu = () => {
  return (
    <Menu>
      <MenuButton>users</MenuButton>
      <MenuItems anchor="bottom">
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/support">
            user management
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/license">
            License
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}

export default DashboardUsersMenu;