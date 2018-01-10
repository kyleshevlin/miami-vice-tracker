import * as actions from '../../src/js/actions/groups'

describe('Group Actions', () => {
  it('addGroup returns a POJO with the correct type and group', () => {
    const group = {
      id: 'cba321',
      name: 'AwesomeSauce'
    }
    const expected = {
      type: 'ADD_GROUP',
      group
    }

    expect(actions.addGroup(group)).toEqual(expected)
  })

  it('editGroup returns a POJO with the correct type and update', () => {
    const id = '321cba'
    const update = { name: 'SauceAwesome' }
    const expected = { type: 'EDIT_GROUP', id, update }

    expect(actions.editGroup(id, update)).toEqual(expected)
  })

  it('deleteGroup returns a POJO with the correct type and id', () => {
    const id = '321cba'
    const expected = { type: 'DELETE_GROUP', id }

    expect(actions.deleteGroup(id)).toEqual(expected)
  })
})
